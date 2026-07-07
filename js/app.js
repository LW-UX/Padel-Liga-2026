// ── VIEWER ────────────────────────────────────────────────────────
const VIEWER_STORAGE_KEY_PREFIX = 'padel-liga-viewer';
let PADEL_DATA = null;
let selectedSeason = null;
let selectedViewerId = 'sb';
let matchScope = 'all';
let rankingSortMode = 'points';
let rankingViewMode = 'compact';

function getViewerStorageKey() {
  return `${VIEWER_STORAGE_KEY_PREFIX}:${selectedSeason?.id || 'default'}`;
}

function getStoredViewerId() {
  try {
    return localStorage.getItem(getViewerStorageKey()) || 'sb';
  } catch (error) {
    return 'sb';
  }
}

function storeViewerId(id) {
  try {
    localStorage.setItem(getViewerStorageKey(), id);
  } catch (error) {
    // The viewer picker still works for the current page load if storage is blocked.
  }
}

function getSeasonOptions() {
  return Array.isArray(window.PADEL_SEASONS) ? window.PADEL_SEASONS : [];
}

function getRequestedSeasonId() {
  return new URLSearchParams(window.location.search).get('saison');
}

function getDefaultSeasonOption() {
  const seasons = getSeasonOptions();
  const requestedSeasonId = getRequestedSeasonId();
  const requestedSeason = seasons.find(season => season.id === requestedSeasonId);

  return requestedSeason || seasons.find(season => season.default) || seasons[seasons.length - 1] || null;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Konnte ${src} nicht laden.`));
    document.head.appendChild(script);
  });
}

async function loadActiveSeason() {
  selectedSeason = getDefaultSeasonOption();
  if (!selectedSeason) throw new Error('Keine Saison in data/seasons.js gefunden.');

  window.PADEL_SEASON = null;
  await loadScript(selectedSeason.file);
  PADEL_DATA = window.PADEL_SEASON;

  if (!PADEL_DATA?.players || !PADEL_DATA?.matches) {
    throw new Error(`Saison ${selectedSeason.id} ist unvollständig.`);
  }
}

function applySeasonMetadata() {
  const label = PADEL_DATA.label || selectedSeason.label || selectedSeason.id;
  const title = PADEL_DATA.title || `Padel-Liga ${label}`;
  const organizations = PADEL_DATA.organizations || [];

  document.title = title;
  document.querySelectorAll('[data-season-label]').forEach(element => {
    element.textContent = label;
  });
  document.getElementById('hero-orgs').textContent = organizations.length
    ? `  ·  ${organizations.join('  ×  ')}`
    : '';
}

function resetSeasonState() {
  selectedViewerId = getStoredViewerId();
  if (!getViewerOptions().some(option => option.id === selectedViewerId)) {
    selectedViewerId = 'sb';
  }
  matchScope = 'all';
  rankingSortMode = 'points';
  rankingViewMode = 'compact';
  activeP = new Set(PADEL_DATA.players.map(player => player.id));
  chart?.destroy();
  placementChart?.destroy();
  chart = null;
  placementChart = null;
}

function isMobileViewport() {
  return window.matchMedia('(max-width: 768px)').matches;
}

function getViewerOptions() {
  return [
    { id: 'sb', name: 'Auswählen', short: '-/-' },
    ...PADEL_DATA.players.map(player => ({
      id: player.id,
      name: player.name,
      short: player.initials
    }))
  ];
}

function getSelectedViewer() {
  return getViewerOptions().find(option => option.id === selectedViewerId) || getViewerOptions()[0];
}

function isParticipantView() {
  return selectedViewerId !== 'sb';
}

function isSelectedPlayer(playerName) {
  return isParticipantView() && getSelectedViewer().name === playerName;
}

function isSelectedViewerFirma(firma) {
  const selectedPlayer = PADEL_DATA.players.find(player => player.id === selectedViewerId);
  return Boolean(selectedPlayer && selectedPlayer.firma === firma);
}

function isViewerMatch(match) {
  return isParticipantView() &&
    [...match.team1.spieler, ...match.team2.spieler].includes(getSelectedViewer().name);
}

function toggleViewerMenu() {
  const picker = document.getElementById('viewer-picker');
  const isOpen = picker.classList.toggle('open');
  document.querySelector('.viewer-toggle').setAttribute('aria-expanded', String(isOpen));
}

function closeViewerMenu() {
  const picker = document.getElementById('viewer-picker');
  if (!picker) return;
  picker.classList.remove('open');
  picker.querySelector('.viewer-toggle')?.setAttribute('aria-expanded', 'false');
}

function selectViewer(id) {
  selectedViewerId = id;
  storeViewerId(selectedViewerId);
  if (!isParticipantView() && matchScope === 'mine') matchScope = 'all';
  updateViewerPicker();
  updateChartViewerFocus();
  renderHome();
  renderRanking();
  renderSpiele();
  renderStatistik();
  closeViewerMenu();
}

function updateViewerPicker() {
  const selected = getSelectedViewer();
  document.getElementById('viewer-label-full').textContent = selected.name;
  document.getElementById('viewer-label-short').textContent = selected.short;
  document.getElementById('viewer-menu').innerHTML = getViewerOptions().map(option => `
    <button
      type="button"
      class="viewer-option ${option.id === selectedViewerId ? 'active' : ''}"
      role="option"
      aria-selected="${option.id === selectedViewerId}"
      data-viewer-id="${option.id}"
    >
      <span>${option.name}</span>
      <span>${option.short}</span>
    </button>
  `).join('');
}

document.addEventListener('click', event => {
  const viewerToggle = event.target.closest('[data-viewer-toggle]');
  if (viewerToggle) {
    toggleViewerMenu();
    return;
  }

  const viewerOption = event.target.closest('[data-viewer-id]');
  if (viewerOption) {
    selectViewer(viewerOption.dataset.viewerId);
    return;
  }

  const navControl = event.target.closest('[data-nav-target], nav button[data-section]');
  if (navControl) {
    nav(navControl.dataset.navTarget || navControl.dataset.section, navControl.matches('nav button') ? navControl : null);
    return;
  }

  const matchScopeControl = event.target.closest('[data-match-scope]');
  if (matchScopeControl) {
    setMatchScope(matchScopeControl.dataset.matchScope);
    return;
  }

  const rankingSortControl = event.target.closest('[data-ranking-sort]');
  if (rankingSortControl) {
    setRankingSort(rankingSortControl.dataset.rankingSort);
    return;
  }

  const rankingViewControl = event.target.closest('[data-ranking-view]');
  if (rankingViewControl) {
    setRankingView(rankingViewControl.dataset.rankingView);
    return;
  }

  const homeArticleControl = event.target.closest('[data-expand-home-article]');
  if (homeArticleControl) {
    expandHomeArticle();
    return;
  }

  const infoArticleControl = event.target.closest('[data-expand-info-article]');
  if (infoArticleControl) {
    expandInfoArticle(Number(infoArticleControl.dataset.expandInfoArticle));
    return;
  }

  const chartToggleAllControl = event.target.closest('[data-chart-toggle-all]');
  if (chartToggleAllControl) {
    toggleAll(chartToggleAllControl.dataset.chartToggleAll === 'true');
    return;
  }

  const playerToggleControl = event.target.closest('[data-player-toggle-id]');
  if (playerToggleControl) {
    toggleP(
      playerToggleControl.dataset.playerToggleId,
      Number(playerToggleControl.dataset.playerToggleIndex),
      playerToggleControl
    );
    return;
  }

  const picker = document.getElementById('viewer-picker');
  if (picker && !picker.contains(event.target)) closeViewerMenu();
});

document.addEventListener('mouseover', event => {
  const formChip = event.target.closest('[data-form-match-id]');
  if (formChip) showFormTooltip(formChip);
});

document.addEventListener('mouseout', event => {
  const formChip = event.target.closest('[data-form-match-id]');
  if (formChip && !formChip.contains(event.relatedTarget)) hideFormTooltip();
});

document.addEventListener('focusin', event => {
  const formChip = event.target.closest('[data-form-match-id]');
  if (formChip) showFormTooltip(formChip);
});

document.addEventListener('focusout', event => {
  const formChip = event.target.closest('[data-form-match-id]');
  if (formChip) hideFormTooltip();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeViewerMenu();
    hideFormTooltip();
  }
});

function setMatchScope(scope) {
  matchScope = ['all', 'open', 'mine'].includes(scope) ? scope : 'all';
  if (matchScope === 'mine' && !isParticipantView()) matchScope = 'all';
  renderSpiele();
}

function updateMatchScopeToggle() {
  const toggle = document.getElementById('match-scope-toggle');
  if (!toggle) return;

  const buttons = toggle.querySelectorAll('button');
  const canFilter = isParticipantView();
  if (!canFilter && matchScope === 'mine') matchScope = 'all';

  buttons[0].classList.toggle('active', matchScope === 'all');
  buttons[1].classList.toggle('active', matchScope === 'open');
  buttons[2].classList.toggle('active', matchScope === 'mine');
  buttons[2].disabled = !canFilter;
}

function setRankingSort(mode) {
  rankingSortMode = ['elo', 'placement'].includes(mode) ? mode : 'points';
  renderRanking();
}

function updateRankingSortToggle() {
  const toggle = document.getElementById('ranking-sort-toggle');
  if (!toggle) return;

  const buttons = toggle.querySelectorAll('button');
  buttons[0]?.classList.toggle('active', rankingSortMode === 'points');
  buttons[1]?.classList.toggle('active', rankingSortMode === 'elo');
  buttons[2]?.classList.toggle('active', rankingSortMode === 'placement');
}

function setRankingView(mode) {
  rankingViewMode = mode === 'expanded' ? 'expanded' : 'compact';
  renderRanking();
}

function updateRankingViewToggle() {
  const toggle = document.getElementById('ranking-view-toggle');
  if (!toggle) return;
  const effectiveRankingViewMode = isMobileViewport() ? 'expanded' : rankingViewMode;

  const buttons = toggle.querySelectorAll('button');
  buttons[0].classList.toggle('active', effectiveRankingViewMode === 'compact');
  buttons[1].classList.toggle('active', effectiveRankingViewMode === 'expanded');
}

// ── NAV ───────────────────────────────────────────────────────────
function nav(id, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const activeButton = el || document.querySelector(`nav button[data-section="${id}"]`);
  if (activeButton) activeButton.classList.add('active');
  if (id === 'verlauf') initChart();
}

// ── RANKING ───────────────────────────────────────────────────────
function getPlayerStats(player, matches = PADEL_DATA.matches) {
  const played = matches.filter(m =>
    m.sieger !== null &&
    (m.team1.spieler.includes(player.name) || m.team2.spieler.includes(player.name))
  );
  let siege = 0, punkte = 0, spielDiff = 0, myGames = 0, oppGames = 0, saetzeDiff = 0;
  played.forEach(m => {
    const inT1 = m.team1.spieler.includes(player.name);
    const won = (inT1 && m.sieger === 1) || (!inT1 && m.sieger === 2);
    const [s1, s2] = m.saetze.split(':').map(Number);
    const mySetCount = inT1 ? s1 : s2;
    const oppSetCount = inT1 ? s2 : s1;
    saetzeDiff += mySetCount - oppSetCount;
    if (mySetCount === 2 && oppSetCount === 0) punkte += 3;
    else if (mySetCount === 2 && oppSetCount === 1) punkte += 2;
    else if (mySetCount === 1 && oppSetCount === 2) punkte += 1;
    if (won) siege++;
    m.ergebnis.split(',').forEach(part => {
      const clean = part
        .split(/[–-]/)[0]
        .replace(/\s*\([^)]*\)/g, '')
        .trim();
      const match = clean.match(/^(\d+):(\d+)$/);
      if (match) {
        const g1 = parseInt(match[1]), g2 = parseInt(match[2]);
        if (g1 <= 7 && g2 <= 7) {
          myGames  += inT1 ? g1 : g2;
          oppGames += inT1 ? g2 : g1;
          spielDiff += (inT1 ? g1 : g2) - (inT1 ? g2 : g1);
        }
      }
    });
  });
  return { spiele: played.length, siege, punkte, spielDiff, saetzeDiff, spieleGV: played.length > 0 ? `${myGames}:${oppGames}` : '—' };
}

function getLatestPlayerElo(player) {
  const elo = getLatestPlayerEloValue(player);
  return elo ?? '—';
}

function getLatestPlayerEloValue(player) {
  const latestHistory = (player.history || [])
    .map((h, index) => ({ ...h, index, dateValue: new Date(h.date).getTime() }))
    .filter(h => Number.isFinite(h.dateValue) && Number.isFinite(Number(h.elo)))
    .sort((a, b) => b.dateValue - a.dateValue || b.index - a.index)[0];

  return latestHistory ? Number(latestHistory.elo) : null;
}

function getMatchNumber(matchOrLabel) {
  const value = typeof matchOrLabel === 'string' ? matchOrLabel : matchOrLabel?.id;
  const match = String(value || '').match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function getMatchOrderKey(match) {
  const dateKey = toDateKey(match?.datum) || '9999-12-31';
  const minutes = getMatchTimeMinutes(match || {});
  const matchNumber = getMatchNumber(match);

  return `${dateKey}|${String(minutes).padStart(4, '0')}|${String(matchNumber).padStart(4, '0')}`;
}

function getHistoryOrderKey(historyEntry) {
  const historyMatch = PADEL_DATA.matches.find(match => getMatchNumber(match) === getMatchNumber(historyEntry.spiel));
  if (historyMatch) return getMatchOrderKey(historyMatch);

  const dateKey = toDateKey(historyEntry.date) || '0000-00-00';
  return `${dateKey}|0000|0000`;
}

function getPlayerEloBeforeMatch(player, match) {
  const matchOrderKey = getMatchOrderKey(match);
  const latestHistoryBeforeMatch = (player.history || [])
    .map((historyEntry, index) => ({
      ...historyEntry,
      index,
      orderKey: getHistoryOrderKey(historyEntry)
    }))
    .filter(historyEntry =>
      historyEntry.orderKey < matchOrderKey &&
      Number.isFinite(Number(historyEntry.elo))
    )
    .sort((a, b) => b.orderKey.localeCompare(a.orderKey) || b.index - a.index)[0];

  return latestHistoryBeforeMatch ? Number(latestHistoryBeforeMatch.elo) : null;
}

function expectedScore(playerElo, opponentElo) {
  return 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 500));
}

const TEAM_ELO_WEAKER_WEIGHT = 0.7;

function getWeightedTeamElo(teamElos) {
  const [weakerElo, strongerElo] = [...teamElos].sort((a, b) => a - b);

  return weakerElo * TEAM_ELO_WEAKER_WEIGHT + strongerElo * (1 - TEAM_ELO_WEAKER_WEIGHT);
}

function getMatchWinProbabilityFromElos(match, getEloValue) {
  const playersByName = new Map(PADEL_DATA.players.map(p => [p.name, p]));
  const team1 = match.team1.spieler.map(name => playersByName.get(name));
  const team2 = match.team2.spieler.map(name => playersByName.get(name));

  if (team1.some(p => !p) || team2.some(p => !p)) return null;

  const team1Elos = team1.map(player => getEloValue(player, match));
  const team2Elos = team2.map(player => getEloValue(player, match));

  if ([...team1Elos, ...team2Elos].some(elo => elo === null)) return null;

  const team1Expected = expectedScore(getWeightedTeamElo(team1Elos), getWeightedTeamElo(team2Elos));
  const team1Probability = Math.round(team1Expected * 100);

  return {
    team1: team1Probability,
    team2: 100 - team1Probability
  };
}

function getMatchWinProbability(match) {
  return getMatchWinProbabilityFromElos(match, getLatestPlayerEloValue);
}

function getHistoricalMatchWinProbability(match) {
  return getMatchWinProbabilityFromElos(match, getPlayerEloBeforeMatch);
}

function renderFirmenRanking() {
  const firmen = ['Headsquare', 'Hanako', 'Envidual'];
  const stats = firmen.map(firma => {
    const players = PADEL_DATA.players.filter(p => p.firma === firma);
    let spiele = 0, siege = 0, punkte = 0, spielDiff = 0;
    players.forEach(p => {
      const s = getPlayerStats(p);
      spiele    += s.spiele;
      siege     += s.siege;
      punkte    += s.punkte;
      spielDiff += s.spielDiff;
    });
    const pktPerTN = players.length > 0 ? (punkte / players.length) : 0;
    return { firma, teilnehmer: players.length, spiele, siege, punkte, spielDiff, pktPerTN };
  });
  stats.sort((a, b) =>
    b.pktPerTN  - a.pktPerTN  ||
    b.spielDiff - a.spielDiff
  );
  document.getElementById('fr-meta').textContent = '3 Firmen';
  document.getElementById('fr-body').innerHTML = stats.map((f, i) => {
    const diffStr   = f.spiele > 0 ? (f.spielDiff >= 0 ? `+${f.spielDiff}` : `${f.spielDiff}`) : '—';
    const diffClass = f.spielDiff > 0 ? 'pos' : f.spielDiff < 0 ? 'neg' : 'neu';
    return `<tr class="r${i+1} ${isSelectedViewerFirma(f.firma) ? 'viewer-highlight' : ''}">
      <td class="rn l">${i+1}</td>
      <td class="l"><span class="pname">${f.firma}</span><span class="firma-badge firma-${f.firma}">${f.firma}</span></td>
      <td class="num-val">${f.teilnehmer}</td>
      <td class="num-val">${f.spiele}</td>
      <td class="num-val">${f.siege}</td>
      <td class="num-val">${f.punkte}</td>
      <td class="num-val"><span class="${f.spiele > 0 ? diffClass : 'neu'}">${diffStr}</span></td>
      <td class="punkte-val">${f.pktPerTN.toFixed(2)}</td>
    </tr>`;
  }).join('');
}

function getRankingPositionMap(sortMode = 'points') {
  return new Map(getRankedPlayers(PADEL_DATA.matches, sortMode)
    .map((player, index) => [player.name, index + 1]));
}

function formatSignedInteger(value) {
  if (!Number.isFinite(value)) return '—';
  if (value === 0) return '±0';
  return value > 0 ? `+${value}` : `${value}`;
}

function renderPointsRankReference(currentRank, pointsRank) {
  if (rankingSortMode === 'points' || !Number.isFinite(pointsRank)) return '';

  const delta = pointsRank - currentRank;
  const deltaClass = delta > 0 ? 'pos' : delta < 0 ? 'neg' : 'neu';
  const deltaLabel = formatSignedInteger(delta);

  return `<span class="points-rank-ref" title="Punkte-Rang ${pointsRank}, Veränderung ${deltaLabel}">
    <span class="points-rank-num">${pointsRank}</span>
    <span class="points-rank-delta ${deltaClass}">${deltaLabel}</span>
  </span>`;
}

function getPlayerMatches(player) {
  return PADEL_DATA.matches.filter(match =>
    match.team1.spieler.includes(player.name) || match.team2.spieler.includes(player.name)
  );
}

function getPlayerMatchTeamIndex(player, match) {
  if (match.team1.spieler.includes(player.name)) return 1;
  if (match.team2.spieler.includes(player.name)) return 2;
  return null;
}

function getPlayerMatchProbability(player, match) {
  const probability = match.sieger === null
    ? getMatchWinProbability(match)
    : getHistoricalMatchWinProbability(match);
  const teamIndex = getPlayerMatchTeamIndex(player, match);

  if (!probability || !teamIndex) return null;
  return teamIndex === 1 ? probability.team1 : probability.team2;
}

function getPlayerWinQuote(player) {
  const probabilities = getPlayerMatches(player)
    .map(match => getPlayerMatchProbability(player, match))
    .filter(probability => Number.isFinite(probability));

  if (!probabilities.length) return null;

  return Math.round(probabilities.reduce((sum, probability) => sum + probability, 0) / probabilities.length);
}

function average(values) {
  const numericValues = values.filter(value => Number.isFinite(value));
  if (!numericValues.length) return null;

  return numericValues.reduce((sum, value) => sum + value, 0) / numericValues.length;
}

function formatDecimal(value) {
  return Number.isFinite(value) ? value.toFixed(1) : '—';
}

function formatSignedDecimal(value) {
  if (!Number.isFinite(value)) return '—';
  const rounded = Number(value.toFixed(1));
  if (Object.is(rounded, -0) || rounded === 0) return '0.0';
  return rounded > 0 ? `+${rounded.toFixed(1)}` : rounded.toFixed(1);
}

function getPlayerPlacementFactor(player, rankMap) {
  const partnerPlaces = [];
  const opponentPlaces = [];

  getPlayerMatches(player).forEach(match => {
    const teamIndex = getPlayerMatchTeamIndex(player, match);
    if (!teamIndex) return;

    const team = teamIndex === 1 ? match.team1.spieler : match.team2.spieler;
    const opponents = teamIndex === 1 ? match.team2.spieler : match.team1.spieler;
    const partnerAverage = average(team
      .filter(name => name !== player.name)
      .map(name => rankMap.get(name)));
    const opponentAverage = average(opponents.map(name => rankMap.get(name)));

    if (partnerAverage !== null) partnerPlaces.push(partnerAverage);
    if (opponentAverage !== null) opponentPlaces.push(opponentAverage);
  });

  const partnerAverage = average(partnerPlaces);
  const opponentAverage = average(opponentPlaces);
  const diff = partnerAverage !== null && opponentAverage !== null
    ? partnerAverage - opponentAverage
    : null;

  return { partnerAverage, opponentAverage, diff };
}

function formatPlacementFactor(factor) {
  if (!factor || !Number.isFinite(factor.diff)) return '—';

  const diffClass = factor.diff > 0 ? 'pos' : factor.diff < 0 ? 'neg' : 'neu';
  return `<span class="pf-muted">${formatDecimal(factor.partnerAverage)}</span><span class="pf-muted"> / </span><span class="pf-muted">${formatDecimal(factor.opponentAverage)}</span><span class="pf-muted"> / </span><span class="${diffClass}">${formatSignedDecimal(factor.diff)}</span>`;
}

function getPlayerForm(player) {
  return getPlayerMatches(player)
    .filter(match => match.sieger !== null)
    .sort((a, b) => getMatchOrderKey(b).localeCompare(getMatchOrderKey(a)))
    .slice(0, 3)
    .map((match, index) => {
      const teamIndex = getPlayerMatchTeamIndex(player, match);
      const [team1Sets, team2Sets] = String(match.saetze || '').split(':').map(Number);
      const mySets = teamIndex === 1 ? team1Sets : team2Sets;
      const opponentSets = teamIndex === 1 ? team2Sets : team1Sets;
      const won = match.sieger === teamIndex;
      const tieBreak = mySets === 1 && opponentSets === 2 || mySets === 2 && opponentSets === 1;
      const title = `${formatMatchNumberLabel(match)}: ${won ? 'Sieg' : 'Niederlage'}${tieBreak ? ' im Match-Tie-Break' : ''}`;

      return `<span
        class="form-chip form-recency-${index} ${won ? 'form-win' : 'form-loss'} ${tieBreak ? 'form-tiebreak' : ''}"
        tabindex="0"
        aria-label="${escapeHtml(title)}"
        data-form-player="${escapeHtml(player.name)}"
        data-form-match-id="${escapeHtml(match.id)}"
      >${won ? 'S' : 'N'}</span>`;
    })
    .join('') || '<span class="neu">—</span>';
}

function getPlayerRankingExtras(player, rankMap) {
  return {
    winQuote: getPlayerWinQuote(player),
    placementFactor: getPlayerPlacementFactor(player, rankMap),
    form: getPlayerForm(player)
  };
}

function getPlacementAdjustedRank(player, rankMap) {
  const currentRank = rankMap.get(player.name);
  const factor = getPlayerPlacementFactor(player, rankMap);

  if (!Number.isFinite(currentRank)) return Infinity;
  if (!Number.isFinite(factor.diff)) return currentRank;

  return currentRank - factor.diff;
}

function renderRanking() {
  updateRankingSortToggle();
  updateRankingViewToggle();
  const table = document.getElementById('ranking-table');
  const effectiveRankingViewMode = isMobileViewport() ? 'expanded' : rankingViewMode;
  table.classList.toggle('expanded', effectiveRankingViewMode === 'expanded');
  table.classList.toggle('compact', effectiveRankingViewMode === 'compact');

  const withStats = getRankedPlayers(PADEL_DATA.matches, rankingSortMode);
  const rankMap = getRankingPositionMap('points');
  const firmaShort = { Envidual: 'Env', Headsquare: 'Hsq', Hanako: 'Han' };
  document.getElementById('rl-meta').textContent = withStats.length + ' Spieler';
  const sortNotes = {
    points: 'Top 4: Final-Four-Qualifikation  |  Sortierung: Punkte · Siege · Spiel-Differenz · gewonnene Spiele',
    elo: 'Sortierung: Elo · Punkte · Siege · Spiel-Differenz',
    placement: 'Sortierung: bereinigter Rang aus Punkte-Platz minus Platzierungsfaktor'
  };
  document.getElementById('rl-sort-note').textContent = sortNotes[rankingSortMode] || sortNotes.points;
  document.getElementById('rl-body').innerHTML = withStats.map((p, i) => {
    const currentRank = i + 1;
    const pointsRank = rankMap.get(p.name);
    const extras = getPlayerRankingExtras(p, rankMap);
    const spielDiffStr = p.stats.spiele > 0 ? (p.stats.spielDiff >= 0 ? `+${p.stats.spielDiff}` : `${p.stats.spielDiff}`) : '—';
    const spielDiffClass = p.stats.spielDiff > 0 ? 'pos' : p.stats.spielDiff < 0 ? 'neg' : 'neu';
    const isTopFourQualifier = pointsRank <= 4;
    return `<tr class="r${Math.min(currentRank,4)} ${isTopFourQualifier ? 'top-four-highlight' : ''} ${isSelectedPlayer(p.name) ? 'viewer-highlight' : ''}">
      <td class="rn l sticky-rank"><span class="rank-cell-inner"><span class="rank-main">${currentRank}</span>${renderPointsRankReference(currentRank, pointsRank)}</span></td>
      <td class="l sticky-name"><span class="player-cell-inner"><span class="pname">${p.name}</span><span class="firma-badge firma-${p.firma}"><span class="firma-full">${p.firma}</span><span class="firma-short">${firmaShort[p.firma] || p.firma}</span></span></span></td>
      <td class="num-val">${p.stats.spiele}</td>
      <td class="num-val">${p.stats.siege}</td>
      <td class="punkte-val">${p.stats.punkte}</td>
      <td class="num-val extended-col">${p.stats.spiele > 0 ? p.stats.spieleGV : '—'}</td>
      <td class="num-val"><span class="${p.stats.spiele > 0 ? spielDiffClass : 'neu'}">${spielDiffStr}</span></td>
      <td class="elo-val">${getLatestPlayerElo(p)}</td>
      <td class="extended-col form-val">${extras.form}</td>
      <td class="num-val extended-col">${extras.winQuote === null ? '—' : `${extras.winQuote}%`}</td>
      <td class="num-val extended-col placement-factor-val">${formatPlacementFactor(extras.placementFactor)}</td>
    </tr>`;
  }).join('');
  renderFirmenRanking();
}

function getRankedPlayers(matches = PADEL_DATA.matches, sortMode = 'points') {
  const withStats = PADEL_DATA.players.map(p => ({ ...p, stats: getPlayerStats(p, matches) }));
  if (sortMode === 'elo') {
    withStats.sort((a, b) =>
      (getLatestPlayerEloValue(b) ?? -Infinity) - (getLatestPlayerEloValue(a) ?? -Infinity) ||
      b.stats.punkte - a.stats.punkte ||
      b.stats.siege - a.stats.siege ||
      b.stats.spielDiff - a.stats.spielDiff
    );
  } else if (sortMode === 'placement') {
    const rankMap = getRankingPositionMap('points');
    withStats.sort((a, b) =>
      getPlacementAdjustedRank(a, rankMap) - getPlacementAdjustedRank(b, rankMap) ||
      b.stats.punkte - a.stats.punkte ||
      b.stats.siege - a.stats.siege ||
      b.stats.spielDiff - a.stats.spielDiff
    );
  } else {
    withStats.sort((a,b) =>
      b.stats.punkte     - a.stats.punkte     ||
      b.stats.siege      - a.stats.siege      ||
      b.stats.spielDiff  - a.stats.spielDiff  ||
      b.stats.saetzeDiff - a.stats.saetzeDiff
    );
  }
  return withStats;
}

function renderTeamPlayers(players) {
  return players.map((player, index) => `
    ${index > 0 ? '<span class="mc-player-sep">&amp;</span>' : ''}
    <span class="mc-player-name ${isSelectedPlayer(player) ? 'viewer-player' : ''}">${player}</span>
  `).join('');
}

function formatMatchTime(time) {
  if (!time) return '';
  const value = String(time).trim().replace(',', '.').replace(':', '.');
  const [hours, rawMinutes = '00'] = value.split('.');
  const minutes = rawMinutes.padEnd(2, '0').slice(0, 2);

  return `${hours.padStart(2, '0')}:${minutes}`;
}

function getMatchTimeMinutes(match) {
  const formattedTime = formatMatchTime(match.uhrzeit);
  if (!formattedTime) return 24 * 60;
  const [hours, minutes] = formattedTime.split(':').map(Number);

  return hours * 60 + minutes;
}

function compareMatchesByDateTime(a, b) {
  return toDateKey(a.datum).localeCompare(toDateKey(b.datum))
    || getMatchTimeMinutes(a) - getMatchTimeMinutes(b)
    || Number(a.id.replace('spiel', '')) - Number(b.id.replace('spiel', ''));
}

function compareMatchesByNumber(a, b) {
  return Number(a.id.replace('spiel', '')) - Number(b.id.replace('spiel', ''));
}

function formatMatchDate(match) {
  const d = parseDateValue(match.datum);
  const date = d
    ? d.toLocaleDateString('de-DE', {day:'2-digit', month:'2-digit'})
    : match.datum;
  const time = formatMatchTime(match.uhrzeit);

  return time ? `${date} ${time}` : date;
}

function formatRelativeMatchDate(match) {
  const dateKey = toDateKey(match.datum);
  const todayKey = toDateKey(new Date());
  const date = parseDateValue(dateKey);
  const today = parseDateValue(todayKey);
  const time = formatMatchTime(match.uhrzeit);

  if (!date || !today) return formatMatchDate(match);

  const dayDiff = Math.round((date.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
  const relativeLabel = dayDiff === -1
    ? 'Gestern'
    : dayDiff === 0 ? 'Heute' : dayDiff === 1 ? 'Morgen' : null;

  if (!relativeLabel) return formatMatchDate(match);

  return time ? `${relativeLabel} ${time}` : relativeLabel;
}

function formatMatchMeta(match, options = {}) {
  const date = options.relative ? formatRelativeMatchDate(match) : formatMatchDate(match);
  return `${match.id.replace('spiel','Spiel ')} | ${date}`;
}

function getPendingMatchLabel(match) {
  return match.uhrzeit ? 'Terminiert' : 'Ausstehend';
}

function getCurrentArticle() {
  const articles = PADEL_DATA.articles || [];
  const todayKey = toDateKey(new Date());
  const current = articles.find(article => {
    if (!article.startDate && !article.endDate) return false;
    const start = article.startDate || '0000-01-01';
    const end = article.endDate || '9999-12-31';
    return start <= todayKey && todayKey <= end;
  });

  return current || articles[0];
}

function renderArticleCard(article) {
  const meta = article.meta || `Spieltag ${article.spieltag}`;
  return `<article class="article-card">
    <div class="article-meta">${meta}</div>
    <h3>${article.title}</h3>
    ${article.body ? `<div class="article-body">${article.body.map(renderArticleBlock).join('')}</div>` : ''}
  </article>`;
}

function renderArticleBlock(block) {
  if (block.type === 'h') return `<h4>${block.text}</h4>`;
  if (block.type === 'match') {
    let matchup = block.text;
    let result = block.result;
    let resultLabel = block.resultLabel || 'Ergebnis';
    if (!result) {
      [matchup, result] = block.text.split(/\s*\|\s*Ergebnis:\s*/);
      resultLabel = 'Ergebnis';
    }
    return `<div class="article-match">
      <span>${matchup}</span>
      ${result ? `<span class="article-match-result">${resultLabel}: ${result}</span>` : ''}
    </div>`;
  }
  if (block.type === 'quote') {
    return `<blockquote>
      <p>${block.text}</p>
      <cite>${block.author}</cite>
    </blockquote>`;
  }
  return `<p>${block.text}</p>`;
}

function renderHome() {
  document.getElementById('home-short-info').innerHTML = (PADEL_DATA.shortInfo || [])
    .map(item => `<li>${item}</li>`)
    .join('');

  document.getElementById('home-articles').innerHTML = `
    <div class="home-article-preview" id="home-article-preview">
      ${getCurrentArticle() ? renderArticleCard(getCurrentArticle()) : '<div class="empty-state">Noch keine Artikel für diese Saison.</div>'}
    </div>
    <button class="text-link article-readmore" id="article-readmore" data-expand-home-article>Weiterlesen</button>
  `;

  document.getElementById('home-ranking').innerHTML = getRankedPlayers().slice(0, 4)
    .map((p, i) => `<div class="mini-rank-row r${i + 1} ${isSelectedPlayer(p.name) ? 'viewer-highlight' : ''}">
      <span class="mini-rank-pos">${i + 1}</span>
      <span class="mini-rank-name">${p.name}</span>
      <span class="mini-rank-points">${p.stats.punkte}</span>
    </div>`)
    .join('');

  const todayKey = toDateKey(new Date());
  const nextMatches = PADEL_DATA.matches
    .filter(m => m.sieger === null && m.uhrzeit && toDateKey(m.datum) >= todayKey)
    .sort(compareMatchesByDateTime)
    .slice(0, 3);

  document.getElementById('home-next-matches').innerHTML = nextMatches.length
    ? nextMatches.map(m => {
      const probability = getMatchWinProbability(m);
      const probabilityHtml = probability ? `${probability.team1}% : ${probability.team2}%` : '—';
      return `<div class="mini-match-row ${isViewerMatch(m) ? 'viewer-match' : ''}">
        <div class="mini-match-meta">${formatMatchMeta(m, { relative: true })}</div>
        <div class="mini-match-grid">
          <div class="mini-match-team mini-match-team-1">${renderTeamPlayers(m.team1.spieler)}</div>
          <div class="mini-match-status">
            <div class="mini-match-prob">${probabilityHtml}</div>
            <div class="mini-match-label">${getPendingMatchLabel(m)}</div>
          </div>
          <div class="mini-match-team mini-match-team-2">${renderTeamPlayers(m.team2.spieler)}</div>
        </div>
      </div>`;
    }).join('')
    : '<div class="empty-state">Keine weiteren Spiele terminiert.</div>';
}

function renderStatTeamPlayers(players) {
  return `<span class="stat-team-players">${renderTeamPlayers(players)}</span>`;
}

function getWinnerTeam(match) {
  if (match.sieger === 1) return match.team1.spieler;
  if (match.sieger === 2) return match.team2.spieler;
  return [];
}

function getWinnerProbability(match) {
  const probability = getHistoricalMatchWinProbability(match);
  if (!probability || match.sieger === null) return null;

  return match.sieger === 1 ? probability.team1 : probability.team2;
}

function formatMatchNumberLabel(match) {
  return `Spiel ${getMatchNumber(match)}`;
}

function formatWinnerResult(match) {
  return formatResultForPlayer(match.ergebnis, match.sieger === 1);
}

function getMatchGameStats(match) {
  const scores = [...String(match.ergebnis || '').matchAll(/(\d+)\s*:\s*(\d+)/g)];
  let team1Games = 0;
  let team2Games = 0;

  scores.forEach(score => {
    const team1Score = Number(score[1]);
    const team2Score = Number(score[2]);
    if (team1Score > 7 || team2Score > 7) return;

    team1Games += team1Score;
    team2Games += team2Score;
  });

  const winnerGames = match.sieger === 1 ? team1Games : team2Games;
  const loserGames = match.sieger === 1 ? team2Games : team1Games;

  return {
    team1Games,
    team2Games,
    winnerGames,
    loserGames,
    diff: winnerGames - loserGames
  };
}

function getPlayedMatchesWithProbability() {
  return PADEL_DATA.matches
    .filter(match => match.sieger !== null)
    .map(match => ({
      match,
      probability: getHistoricalMatchWinProbability(match)
    }))
    .filter(item => item.probability);
}

function renderFavoriteCheck() {
  const matches = getPlayedMatchesWithProbability()
    .filter(({ probability }) => probability.team1 !== probability.team2);

  if (!matches.length) {
    document.getElementById('favorite-check').innerHTML = '<div class="empty-state">Noch keine Favoriten-Daten.</div>';
    return;
  }

  const favoriteWins = matches.filter(({ match, probability }) => {
    const favorite = probability.team1 > probability.team2 ? 1 : 2;
    return match.sieger === favorite;
  }).length;
  const favoriteRate = Math.round((favoriteWins / matches.length) * 100);

  document.getElementById('favorite-check').innerHTML = `
    <div class="stat-main">${favoriteRate}%</div>
    <div class="stat-copy">Favoriten gewannen ${favoriteWins} von ${matches.length} Spielen.</div>
  `;
}

function renderDominantMatches() {
  const dominantMatches = PADEL_DATA.matches
    .filter(match => match.sieger !== null)
    .map(match => ({ match, gameStats: getMatchGameStats(match) }))
    .filter(item => Number.isFinite(item.gameStats.diff) && item.gameStats.diff > 0)
    .sort((a, b) =>
      b.gameStats.diff - a.gameStats.diff ||
      a.gameStats.loserGames - b.gameStats.loserGames ||
      getMatchNumber(a.match) - getMatchNumber(b.match)
    )
    .slice(0, 3);

  document.getElementById('dominant-matches').innerHTML = dominantMatches.length
    ? dominantMatches.map((item, index) => `
      <div class="mini-rank-row r${index + 1}">
        <span class="mini-rank-pos">${index + 1}</span>
        <div>
          <div class="mini-rank-name">${renderStatTeamPlayers(getWinnerTeam(item.match))}</div>
          <div class="stat-meta-line">${formatMatchNumberLabel(item.match)} · ${formatWinnerResult(item.match)} · +${item.gameStats.diff}</div>
        </div>
      </div>
    `).join('')
    : '<div class="empty-state">Noch keine gespielten Matches.</div>';
}

function renderBiggestUpsets() {
  const upsets = getPlayedMatchesWithProbability()
    .map(({ match }) => ({
      match,
      winnerProbability: getWinnerProbability(match)
    }))
    .filter(item => Number.isFinite(item.winnerProbability) && item.winnerProbability < 50)
    .sort((a, b) =>
      a.winnerProbability - b.winnerProbability ||
      getMatchNumber(a.match) - getMatchNumber(b.match)
    )
    .slice(0, 3);

  document.getElementById('biggest-upsets').innerHTML = upsets.length
    ? upsets.map((item, index) => `
      <div class="mini-rank-row r${index + 1}">
        <span class="mini-rank-pos">${index + 1}</span>
        <div>
          <div class="mini-rank-name">${renderStatTeamPlayers(getWinnerTeam(item.match))}</div>
          <div class="stat-meta-line">${formatMatchNumberLabel(item.match)} · nur ${item.winnerProbability}% Siegchance</div>
        </div>
      </div>
    `).join('')
    : '<div class="empty-state">Noch kein Außenseiter-Sieg.</div>';
}

function renderStatistik() {
  renderFavoriteCheck();
  renderDominantMatches();
  renderBiggestUpsets();
}

function expandHomeArticle() {
  document.getElementById('home-article-preview').classList.add('expanded');
  document.getElementById('article-readmore').style.display = 'none';
}

function sectionId(title) {
  return title.toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function renderInfoSection(section, id) {
  const link = section.link
    ? `<a href="${section.link.href}" target="_blank" rel="noopener" class="text-link inline-link">${section.link.label}</a>`
    : '';
  const intro = section.intro ? `<p>${section.intro} ${link}</p>` : '';
  const paragraphs = (section.paragraphs || []).map(p => `<p>${p}</p>`).join('');
  const groups = (section.groups || []).map(group => `<div class="info-group">
    <h3>${group.title}</h3>
    <ul class="clean-list">${group.items.map(item => `<li>${item}</li>`).join('')}</ul>
  </div>`).join('');
  const items = section.items
    ? `<ul class="clean-list">${section.items.map(item => `<li>${item}</li>`).join('')}</ul>`
    : '';
  const table = section.table
    ? `<div class="info-table-wrap"><table class="info-table">${section.table.map((row, index) => `
      <tr>${row.map(cell => index === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`).join('')}</tr>
    `).join('')}</table></div>`
    : '';
  const note = section.note ? `<p class="info-note">${section.note}</p>` : '';

  return `<article class="info-card info-anchor" id="${id}">
    <h2>${section.title}</h2>
    ${intro}
    ${paragraphs}
    ${groups}
    ${table}
    ${items}
    ${note}
  </article>`;
}

function renderInfoArticle(article, index) {
  return `<article class="info-card info-article-card info-anchor" id="artikel-${article.spieltag}">
    <div class="info-article-preview" id="info-article-preview-${index}">
      ${renderArticleCard(article)}
    </div>
    <button class="text-link info-article-readmore" id="info-article-readmore-${index}" data-expand-info-article="${index}">Weiterlesen</button>
  </article>`;
}

function expandInfoArticle(index) {
  document.getElementById(`info-article-preview-${index}`).classList.add('expanded');
  document.getElementById(`info-article-readmore-${index}`).style.display = 'none';
}

function renderInfos() {
  const articles = PADEL_DATA.articles || [];
  const sectionLinks = [
    { id: 'kurzinfo', title: 'Kurzinfo' },
    ...PADEL_INFO.sections.map(section => ({ id: sectionId(section.title), title: section.title })),
    { id: 'artikel', title: 'Artikel' },
    ...articles.map(article => ({
      id: `artikel-${article.spieltag}`,
      title: article.title,
      sub: true
    }))
  ];

  document.getElementById('info-menu').innerHTML = sectionLinks
    .map(link => `<a href="#${link.id}" class="${link.sub ? 'is-sub' : ''}">${link.title}</a>`)
    .join('');

  const shortInfo = `<article class="info-card info-anchor" id="kurzinfo">
    <h2>Kurzinfo</h2>
    <ul class="clean-list">${(PADEL_DATA.shortInfo || []).map(item => `<li>${item}</li>`).join('')}</ul>
  </article>`;

  const articleSection = `<section class="info-article-section info-anchor" id="artikel">
    <div class="sh info-article-heading">
      <div class="sh-title">ARTIKEL</div>
      <div class="sh-meta">Archiv</div>
    </div>
    <div class="info-articles-stack">
      ${articles.length ? articles.map(renderInfoArticle).join('') : '<article class="info-card"><div class="empty-state">Noch keine Artikel für diese Saison.</div></article>'}
    </div>
  </section>`;

  document.getElementById('info-sections').innerHTML = [
    shortInfo,
    ...PADEL_INFO.sections.map(section => renderInfoSection(section, sectionId(section.title))),
    articleSection
  ].join('');
}

// ── MATCHES ───────────────────────────────────────────────────────
function renderSpiele() {
  updateMatchScopeToggle();
  const spieltage = [...new Set(PADEL_DATA.matches.map(m => m.spieltag))].sort((a,b)=>a-b);
  const played = PADEL_DATA.matches.filter(m => m.sieger !== null).length;
  document.getElementById('sp-meta').textContent = `${played}/${PADEL_DATA.matches.length}`;
  const spielplanHtml = spieltage.map(st => {
    const matches = PADEL_DATA.matches
      .filter(m => m.spieltag === st)
      .filter(m => matchScope !== 'open' || m.sieger === null)
      .filter(m => matchScope !== 'mine' || isViewerMatch(m))
      .sort(compareMatchesByNumber);
    if (!matches.length) return '';

    const rows = matches.map(m => {
      if (m.sieger === null) {
        const probability = getMatchWinProbability(m);
        const probabilityHtml = probability
          ? `<div class="mc-prob">${probability.team1}% : ${probability.team2}%</div>`
          : '';
        return `<div class="mc pending ${isViewerMatch(m) ? 'viewer-match' : ''}">
          <div class="mc-meta"><span class="mc-nr">${formatMatchMeta(m, { relative: true })}</span></div>
          <div class="mc-team mc-team-1">
            <div class="mc-players">${renderTeamPlayers(m.team1.spieler)}</div>
          </div>
          <div class="mc-score">
            ${probabilityHtml}
            <div class="mc-pending-label">${getPendingMatchLabel(m)}</div>
          </div>
          <div class="mc-team mc-team-2">
            <div class="mc-players">${renderTeamPlayers(m.team2.spieler)}</div>
          </div>
        </div>`;
      }
      const t1w = m.sieger === 1, t2w = m.sieger === 2;
      const [s1, s2] = m.saetze.split(':');
      const viewerInT1 = isParticipantView() && m.team1.spieler.includes(getSelectedViewer().name);
      const viewerInT2 = isParticipantView() && m.team2.spieler.includes(getSelectedViewer().name);
      const viewerWon  = (viewerInT1 && m.sieger === 1) || (viewerInT2 && m.sieger === 2);
      const viewerLost = (viewerInT1 && m.sieger === 2) || (viewerInT2 && m.sieger === 1);
      const viewerResultClass = viewerWon ? 'viewer-win' : viewerLost ? 'viewer-loss' : '';
      const probability = getHistoricalMatchWinProbability(m);
      const leftProbability = probability ? `<span class="mc-result-prob">${probability.team1}%</span>` : '';
      const rightProbability = probability ? `<span class="mc-result-prob">${probability.team2}%</span>` : '';
      return `<div class="mc played ${isViewerMatch(m) ? `viewer-match ${viewerResultClass}` : ''}">        <div class="mc-meta"><span class="mc-nr">${formatMatchMeta(m, { relative: true })}</span></div>
        <div class="mc-team mc-team-1 ${t1w?'win':''}">
          <div class="mc-players">${renderTeamPlayers(m.team1.spieler)}</div>
        </div>
        <div class="mc-score">
          <div class="mc-result-row">
            ${leftProbability}
            <div class="mc-score-main">${s1}:${s2}</div>
            ${rightProbability}
          </div>
          <div class="mc-score-detail">${m.ergebnis}</div>
        </div>
        <div class="mc-team mc-team-2 ${t2w?'win':''}">
          <div class="mc-players">${renderTeamPlayers(m.team2.spieler)}</div>
        </div>
      </div>`;
    }).join('');
    const label = st === 7 ? 'Spieltag 7 – Ausgleichsspieltag' : `Spieltag ${st}`;
    return `<div class="spieltag-group">
      <div class="spieltag-label">${label}</div>
      <div class="match-list">${rows}</div>
    </div>`;
  }).join('');

  document.getElementById('spielplan').innerHTML = spielplanHtml || '<div class="empty-state">Keine Spiele für diese Auswahl.</div>';
}

// ── CHART ─────────────────────────────────────────────────────────
const COLORS = ['#d4f53a','#3af5b4','#3a8ff5','#f5a03a','#f53ab4','#a03af5','#f5f53a','#3af5f5','#f53a5a','#7af53a','#f57a3a','#3a5af5','#f53af5','#5af5f5','#f5c43a','#3af58a','#f5503a','#c43af5'];
const GRAY = '#444444';
const CHART_DIM_ALPHA = 'CC';
const CHART_GRAY_MIX = 0.38;

let chart = null;
let placementChart = null;
let activeP = new Set();

function hexToRgb(color) {
  const value = color.replace('#', '');
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b].map(value => Math.round(value).toString(16).padStart(2, '0')).join('')}`;
}

function blendHexColors(color, mixColor, mixAmount) {
  const base = hexToRgb(color);
  const mix = hexToRgb(mixColor);
  return rgbToHex({
    r: base.r * (1 - mixAmount) + mix.r * mixAmount,
    g: base.g * (1 - mixAmount) + mix.g * mixAmount,
    b: base.b * (1 - mixAmount) + mix.b * mixAmount
  });
}

function dimChartColor(color) {
  if (typeof color === 'string' && color.startsWith('#') && color.length === 7) {
    return `${blendHexColors(color, GRAY, CHART_GRAY_MIX)}${CHART_DIM_ALPHA}`;
  }

  return color;
}

function getEloChartColor(color, playerName) {
  return isParticipantView() && getSelectedViewer().name !== playerName
    ? dimChartColor(color)
    : color;
}

function getEloChartLineWidth(playerName) {
  return isParticipantView() && getSelectedViewer().name === playerName ? 3 : 1;
}

function getPlacementLabelWeight(playerName) {
  return isParticipantView() && getSelectedViewer().name === playerName ? 700 : 300;
}

function getPlacementLabelColor(playerName, color) {
  return isParticipantView() && getSelectedViewer().name !== playerName
    ? dimChartColor(color)
    : color;
}

function getPlacementChartColor(color, playerName) {
  return isParticipantView() && getSelectedViewer().name !== playerName
    ? dimChartColor(color)
    : color;
}

function getPlacementChartLineWidth(playerName) {
  return isParticipantView() && getSelectedViewer().name === playerName ? 3 : 1;
}

function updateChartViewerFocus() {
  if (chart) {
    chart.data.datasets.forEach((dataset, index) => {
      const player = PADEL_DATA.players[index];
      const color = getEloChartColor(COLORS[index], player.name);
      dataset.borderColor = color;
      dataset.pointBackgroundColor = color;
      dataset.pointBorderColor = color;
      dataset.pointHoverBackgroundColor = color;
      dataset.pointHoverBorderColor = color;
      dataset.borderWidth = getEloChartLineWidth(player.name);
    });
    chart.update();
  }

  if (placementChart) {
    placementChart.data.datasets.forEach((dataset, index) => {
      const player = PADEL_DATA.players[index];
      const color = getPlacementChartColor(COLORS[index], player.name);
      const playedFlags = dataset.playedFlags;
      dataset.borderColor = color;
      dataset.pointBackgroundColor = playedFlags.map(hasMatch => hasMatch ? color : GRAY);
      dataset.pointBorderColor = playedFlags.map(hasMatch => hasMatch ? color : GRAY);
      dataset.borderWidth = getPlacementChartLineWidth(player.name);
      dataset.segment.borderColor = ctx => getPlacementSegmentColor(ctx, playedFlags, color);
    });
    placementChart.update();
  }
}

function parseDateValue(date) {
  if (!date) return null;
  if (date instanceof Date) return Number.isNaN(date.getTime()) ? null : date;

  const value = String(date).trim();
  const isoDate = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoDate) {
    const d = new Date(Number(isoDate[1]), Number(isoDate[2]) - 1, Number(isoDate[3]));
    return Number.isNaN(d.getTime()) ? null : d;
  }

  const germanDate = value.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2}|\d{4})$/);
  if (germanDate) {
    const year = germanDate[3].length === 2 ? `20${germanDate[3]}` : germanDate[3];
    const d = new Date(Number(year), Number(germanDate[2]) - 1, Number(germanDate[1]));
    return Number.isNaN(d.getTime()) ? null : d;
  }

  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function toDateKey(date) {
  const d = parseDateValue(date);
  if (!d) return null;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function normalizeGameLabel(label) {
  const value = String(label || '').trim();
  const gameNumber = value.match(/spiel\s*(\d+)/i)?.[1];

  if (gameNumber) return `Spiel ${gameNumber}`;
  return value || 'Start';
}

function getGameNumber(label) {
  const gameNumber = String(label || '').match(/spiel\s*(\d+)/i)?.[1];
  return gameNumber ? Number(gameNumber) : null;
}

function getMatchByGameLabel(label) {
  const gameNumber = getGameNumber(label);
  if (!gameNumber) return null;

  return PADEL_DATA.matches.find(match => Number(match.id.replace('spiel', '')) === gameNumber) || null;
}

function getHistoryEventKey(historyEntry) {
  const date = toDateKey(historyEntry.date);
  const gameNumber = getGameNumber(historyEntry.spiel);
  const label = normalizeGameLabel(historyEntry.spiel).toLowerCase().replace(/\s+/g, '-');

  return `${date}|${gameNumber ? `spiel${gameNumber}` : label}`;
}

function formatChartEventLabel(event) {
  if (event.gameLabel === 'Start') return ['Start'];

  const dateLabel = event.match
    ? formatMatchDate(event.match)
    : new Date(event.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });

  return [dateLabel, event.gameLabel];
}

function getChartEvents() {
  const events = new Map();

  PADEL_DATA.players.forEach(player => {
    (player.history || []).forEach((historyEntry, index) => {
      const date = toDateKey(historyEntry.date);
      const elo = Number(historyEntry.elo);
      if (!date || !Number.isFinite(elo)) return;

      const gameLabel = normalizeGameLabel(historyEntry.spiel);
      const match = getMatchByGameLabel(gameLabel);
      const key = getHistoryEventKey(historyEntry);

      if (!events.has(key)) {
        events.set(key, {
          key,
          date,
          gameLabel,
          match,
          index,
          label: null
        });
      }
    });
  });

  return [...events.values()]
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare) return dateCompare;

      const aIsStart = a.gameLabel === 'Start';
      const bIsStart = b.gameLabel === 'Start';
      if (aIsStart !== bIsStart) return aIsStart ? -1 : 1;

      const timeCompare = (a.match ? getMatchTimeMinutes(a.match) : 0) - (b.match ? getMatchTimeMinutes(b.match) : 0);
      if (timeCompare) return timeCompare;

      return (getGameNumber(a.gameLabel) || 0) - (getGameNumber(b.gameLabel) || 0);
    })
    .map((event, eventIndex) => ({ ...event, eventIndex, label: formatChartEventLabel(event) }));
}

function getPlayerMatchContext(playerName, match) {
  if (!match) return null;

  const isTeam1 = match.team1.spieler.includes(playerName);
  const team = isTeam1 ? match.team1.spieler : match.team2.spieler;
  const opponents = isTeam1 ? match.team2.spieler : match.team1.spieler;

  if (!team.includes(playerName)) return null;

  return {
    partner: team.find(name => name !== playerName) || '—',
    opponents: opponents.join(' & '),
    result: formatResultForPlayer(match.ergebnis, isTeam1)
  };
}

function getMatchById(matchId) {
  return PADEL_DATA.matches.find(match => match.id === matchId) || null;
}

function formatStatDiff(diff) {
  if (!Number.isFinite(diff)) return '—';
  return diff >= 0 ? `+${diff}` : `${diff}`;
}

function formatResultForPlayer(result, isTeam1) {
  if (!result) return '—';
  if (isTeam1) return result;

  return result.replace(/(\d+)\s*:\s*(\d+)/g, '$2:$1');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getOrCreateChartTooltip(chartInstance, className = 'chart-custom-tooltip') {
  const parent = chartInstance.canvas.parentNode;
  let tooltip = parent.querySelector(`.${className}`);

  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = className;
    parent.appendChild(tooltip);
  }

  return tooltip;
}

function getOrCreateFormTooltip() {
  let tooltip = document.querySelector('.form-custom-tooltip');

  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'chart-custom-tooltip form-custom-tooltip';
    document.body.appendChild(tooltip);
  }

  return tooltip;
}

function renderEloStyleTooltipItem({
  playerName,
  elo,
  delta,
  deltaClass = 'neu',
  gameLabel = '',
  matchContext = null,
  showElo = true
}) {
  return `<div class="elo-tooltip-item">
    <div class="elo-tooltip-name">${escapeHtml(playerName)}</div>
    ${showElo ? `<div class="elo-tooltip-main">Elo: ${escapeHtml(elo)} ${delta ? `<span class="elo-tooltip-delta ${deltaClass}">${escapeHtml(delta)}</span>` : ''}</div>` : ''}
    ${matchContext ? `
      <div>Ergebnis: ${escapeHtml(matchContext.result)}</div>
      <div>Mit: ${escapeHtml(matchContext.partner)}</div>
      <div>vs. ${escapeHtml(matchContext.opponents)}</div>
    ` : gameLabel ? `
      <div>${escapeHtml(gameLabel)}</div>
    ` : ''}
  </div>`;
}

function positionChartTooltip(chartInstance, tooltip, tooltipEl) {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  tooltipEl.style.opacity = 1;

  if (isMobile) {
    const parentHeight = chartInstance.canvas.parentNode.clientHeight;
    const tooltipHeight = tooltipEl.offsetHeight || 0;
    const top = Math.min(
      Math.max(tooltip.caretY + 16, 12),
      Math.max(parentHeight - tooltipHeight - 12, 12)
    );

    tooltipEl.style.left = '50%';
    tooltipEl.style.top = `${top}px`;
    tooltipEl.style.transform = 'translateX(-50%)';
    return;
  }

  tooltipEl.style.left = `${tooltip.caretX}px`;
  tooltipEl.style.top = `${tooltip.caretY}px`;
  tooltipEl.style.transform = 'translate(12px, -50%)';
}

function positionFormTooltip(anchor, tooltipEl) {
  const rect = anchor.getBoundingClientRect();
  const gap = 10;
  const viewportPadding = 12;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  tooltipEl.style.opacity = 1;
  tooltipEl.style.transform = 'none';
  tooltipEl.style.left = `${viewportPadding}px`;
  tooltipEl.style.top = `${rect.bottom + gap}px`;

  const tooltipWidth = tooltipEl.offsetWidth || 240;
  const tooltipHeight = tooltipEl.offsetHeight || 80;

  if (isMobile) {
    const top = Math.min(rect.bottom + gap, window.innerHeight - tooltipHeight - viewportPadding);
    tooltipEl.style.left = `${viewportPadding}px`;
    tooltipEl.style.right = `${viewportPadding}px`;
    tooltipEl.style.top = `${Math.max(top, viewportPadding)}px`;
    return;
  }

  tooltipEl.style.right = 'auto';

  let left = rect.right + gap;
  if (left + tooltipWidth > window.innerWidth - viewportPadding) {
    left = rect.left - tooltipWidth - gap;
  }
  if (left < viewportPadding) left = viewportPadding;

  let top = rect.top + rect.height / 2 - tooltipHeight / 2;
  top = Math.max(viewportPadding, Math.min(top, window.innerHeight - tooltipHeight - viewportPadding));

  tooltipEl.style.left = `${left}px`;
  tooltipEl.style.top = `${top}px`;
}

function showFormTooltip(anchor) {
  const match = getMatchById(anchor.dataset.formMatchId);
  const playerName = anchor.dataset.formPlayer;
  const matchContext = getPlayerMatchContext(playerName, match);
  const tooltipEl = getOrCreateFormTooltip();

  if (!match || !matchContext) {
    tooltipEl.style.opacity = 0;
    return;
  }

  tooltipEl.innerHTML = `
    <div class="elo-tooltip-title">${escapeHtml(formatMatchMeta(match))}</div>
    ${renderEloStyleTooltipItem({
      playerName,
      matchContext,
      showElo: false
    })}
  `;
  positionFormTooltip(anchor, tooltipEl);
}

function hideFormTooltip() {
  const tooltipEl = document.querySelector('.form-custom-tooltip');
  if (tooltipEl) tooltipEl.style.opacity = 0;
}

function externalEloTooltip(context) {
  const { chart: chartInstance, tooltip } = context;
  const tooltipEl = getOrCreateChartTooltip(chartInstance);

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  const items = tooltip.dataPoints || [];
  const title = items.find(item => item.dataset.eventTitles?.[item.dataIndex])?.dataset.eventTitles?.[items[0]?.dataIndex] || '';

  tooltipEl.innerHTML = `
    ${title ? `<div class="elo-tooltip-title">${escapeHtml(title)}</div>` : ''}
    ${items.map(item => {
      const delta = item.dataset.deltaLabels?.[item.dataIndex] || '';
      const deltaClass = item.dataset.deltas?.[item.dataIndex] > 0
        ? 'pos'
        : item.dataset.deltas?.[item.dataIndex] < 0 ? 'neg' : 'neu';
      const gameLabel = item.dataset.gameLabels?.[item.dataIndex] || '';
      const matchContext = item.dataset.matchContexts?.[item.dataIndex];

      return renderEloStyleTooltipItem({
        playerName: item.dataset.label,
        elo: item.parsed.y,
        delta,
        deltaClass,
        gameLabel,
        matchContext
      });
    }).join('')}
  `;

  positionChartTooltip(chartInstance, tooltip, tooltipEl);
}

function externalPlacementTooltip(context) {
  const { chart: chartInstance, tooltip } = context;
  const tooltipEl = getOrCreateChartTooltip(chartInstance);

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  const items = (tooltip.dataPoints || [])
    .filter(item => item.dataset.playedFlags?.[item.dataIndex]);

  if (!items.length) {
    tooltipEl.style.opacity = 0;
    return;
  }

  tooltipEl.innerHTML = items.map(item => {
    const stats = item.dataset.statsByPoint?.[item.dataIndex];
    const diff = stats ? formatStatDiff(stats.spielDiff) : '—';
    const diffClass = stats?.spielDiff > 0 ? 'pos' : stats?.spielDiff < 0 ? 'neg' : 'neu';
    const points = stats && Number.isFinite(Number(stats.punkte)) ? String(stats.punkte) : '0';
    const wins = stats && Number.isFinite(Number(stats.siege)) ? String(stats.siege) : '0';

    return `<div class="elo-tooltip-item">
      <div class="elo-tooltip-name">${escapeHtml(item.dataset.label)}</div>
      <div>Platz: ${escapeHtml(item.parsed.y)}</div>
      <div>Pkt.: ${escapeHtml(points)} · Siege: ${escapeHtml(wins)} · Diff.: <span class="elo-tooltip-delta ${diffClass}">${escapeHtml(diff)}</span></div>
    </div>`;
  }).join('');

  positionChartTooltip(chartInstance, tooltip, tooltipEl);
}

function formatEloDelta(delta) {
  if (!Number.isFinite(delta) || delta === 0) return delta === 0 ? '±0' : '';
  return delta > 0 ? `+${delta}` : `${delta}`;
}

function getPlayerSeries(player, events) {
  const historyByEvent = new Map(
    (player.history || [])
      .map(historyEntry => [getHistoryEventKey(historyEntry), historyEntry])
      .filter(([key, entry]) => key && Number.isFinite(Number(entry.elo)))
  );
  let previousElo = null;
  const series = {
    eloValues: [],
    deltas: [],
    deltaLabels: [],
    gameLabels: [],
    eventTitles: [],
    matchContexts: []
  };

  events.forEach(event => {
    const historyEntry = historyByEvent.get(event.key);
    if (!historyEntry) {
      series.eloValues.push(null);
      series.deltas.push(null);
      series.deltaLabels.push('');
      series.gameLabels.push('');
      series.eventTitles.push('');
      series.matchContexts.push(null);
      return;
    }

    const elo = Number(historyEntry.elo);
    const delta = previousElo === null ? null : elo - previousElo;
    previousElo = elo;

    series.eloValues.push(elo);
    series.deltas.push(delta);
    series.deltaLabels.push(formatEloDelta(delta));
    series.gameLabels.push(event.gameLabel);
    series.eventTitles.push(event.gameLabel === 'Start'
      ? 'Start'
      : event.match ? formatMatchMeta(event.match) : formatMatchDate({ datum: event.date }));
    series.matchContexts.push(getPlayerMatchContext(player.name, event.match));
  });

  return series;
}

function getPlacementSeries() {
  const matchDays = [...new Set(PADEL_DATA.matches.map(m => m.spieltag))].sort((a, b) => a - b);
  const placementsByPlayer = new Map(PADEL_DATA.players.map(p => [p.name, []]));
  const playedByPlayer = new Map(PADEL_DATA.players.map(p => [p.name, []]));
  const statsByPlayer = new Map(PADEL_DATA.players.map(p => [p.name, []]));

  matchDays.forEach(spieltag => {
    const matchesUntilDay = PADEL_DATA.matches.filter(m => m.sieger !== null && m.spieltag <= spieltag);
    const matchesAtDay = PADEL_DATA.matches.filter(m => m.sieger !== null && m.spieltag === spieltag);
    const ranked = getRankedPlayers(matchesUntilDay);
    ranked.forEach((player, index) => {
      placementsByPlayer.get(player.name).push(index + 1);
      statsByPlayer.get(player.name).push(player.stats);
      playedByPlayer.get(player.name).push(matchesAtDay.some(m =>
        m.team1.spieler.includes(player.name) || m.team2.spieler.includes(player.name)
      ));
    });
  });

  return { matchDays, placementsByPlayer, playedByPlayer, statsByPlayer };
}

const placementLabelPlugin = {
  id: 'placementLabelPlugin',
  afterDatasetsDraw(chartInstance) {
    const { ctx, chartArea } = chartInstance;
    ctx.save();
    ctx.textBaseline = 'middle';

    chartInstance.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chartInstance.getDatasetMeta(datasetIndex);
      if (!meta.data.length) return;

      const point = meta.data[meta.data.length - 1];
      ctx.font = `${getPlacementLabelWeight(dataset.label)} 11px DM Sans`;
      ctx.fillStyle = getPlacementLabelColor(dataset.label, dataset.baseColor || dataset.borderColor);
      ctx.fillText(dataset.label, Math.min(point.x + 8, chartArea.right + 8), point.y);
    });

    ctx.restore();
  }
};

function initChart() {
  if (chart) {
    initPlacementChart();
    return;
  }
  const chartEvents = getChartEvents();

  const datasets = PADEL_DATA.players.map((p, i) => {
    const series = getPlayerSeries(p, chartEvents);
    const color = getEloChartColor(COLORS[i], p.name);
    return {
      label: p.name,
      data: series.eloValues,
      deltas: series.deltas,
      deltaLabels: series.deltaLabels,
      gameLabels: series.gameLabels,
      eventTitles: series.eventTitles,
      matchContexts: series.matchContexts,
      borderColor: color,
      backgroundColor: 'transparent',
      pointBackgroundColor: color,
      pointBorderColor: color,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: color,
      borderWidth: getEloChartLineWidth(p.name),
      pointRadius: 4,
      pointHoverRadius: 5,
      tension: 0.3,
      spanGaps: true
    };
  });

  const ctx = document.getElementById('eloChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartEvents.map(event => new Date(event.date).toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'})),
      datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', intersect: true },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: false,
          external: externalEloTooltip
        }
      },
      scales: {
        x: { grid: { color: '#222' }, ticks: { color: '#5a5a72', font: { family: 'DM Sans', size: 12 } } },
        y: {
          min: 600, max: 1250,
          grid: { color: '#222' },
          ticks: { color: '#5a5a72', font: { family: 'DM Sans', size: 12 } }
        }
      }
    }
  });
  initPlacementChart();
  renderFilter();
}

function getPlacementSegmentColor(context, playedFlags, color) {
  const fromPlayed = playedFlags[context.p0DataIndex];
  const toPlayed = playedFlags[context.p1DataIndex];

  if (fromPlayed && toPlayed) return color;
  if (!fromPlayed && !toPlayed) return GRAY;

  const xScale = context.chart.scales.x;
  const x0 = xScale.getPixelForValue(context.p0DataIndex);
  const x1 = xScale.getPixelForValue(context.p1DataIndex);
  const gradient = context.chart.ctx.createLinearGradient(x0, 0, x1, 0);

  gradient.addColorStop(0, fromPlayed ? color : GRAY);
  gradient.addColorStop(1, toPlayed ? color : GRAY);

  return gradient;
}

function initPlacementChart() {
  if (placementChart) return;
  const { matchDays, placementsByPlayer, playedByPlayer, statsByPlayer } = getPlacementSeries();
  const maxPlace = PADEL_DATA.players.length;
  const datasets = PADEL_DATA.players.map((p, i) => {
    const playedFlags = playedByPlayer.get(p.name);
    const color = getPlacementChartColor(COLORS[i], p.name);
    return {
      label: p.name,
      data: placementsByPlayer.get(p.name),
      playedFlags,
      statsByPoint: statsByPlayer.get(p.name),
      baseColor: COLORS[i],
      borderColor: color,
      backgroundColor: 'transparent',
      pointBackgroundColor: playedFlags.map(hasMatch => hasMatch ? color : GRAY),
      pointBorderColor: playedFlags.map(hasMatch => hasMatch ? color : GRAY),
      borderWidth: getPlacementChartLineWidth(p.name),
      pointRadius: playedFlags.map(hasMatch => hasMatch ? 3 : 0),
      pointHitRadius: playedFlags.map(hasMatch => hasMatch ? 8 : 0),
      pointHoverRadius: playedFlags.map(hasMatch => hasMatch ? 4 : 0),
      tension: 0,
      segment: {
        borderColor: ctx => getPlacementSegmentColor(ctx, playedFlags, color)
      }
    };
  });

  const ctx = document.getElementById('placementChart').getContext('2d');
  placementChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: matchDays.map(day => `ST ${day}`),
      datasets
    },
    plugins: [placementLabelPlugin],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { right: 90 } },
      interaction: { mode: 'point', intersect: true },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: false,
          mode: 'point',
          intersect: true,
          filter: item => item.dataset.playedFlags?.[item.dataIndex],
          external: externalPlacementTooltip
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Spieltag', color: '#a2a2b7', font: { family: 'DM Sans', size: 14, weight: '600' } },
          grid: { color: '#222' },
          ticks: { color: '#5a5a72', font: { family: 'DM Sans', size: 12 } }
        },
        y: {
          reverse: true,
          min: 0.5,
          max: maxPlace + 0.5,
          title: { display: true, text: 'Platz', color: '#a2a2b7', font: { family: 'DM Sans', size: 14, weight: '600' } },
          grid: { color: '#222' },
          ticks: {
            stepSize: 1,
            color: '#5a5a72',
            font: { family: 'DM Sans', size: 12 },
            callback: value => Number.isInteger(value) ? value : ''
          }
        }
      }
    }
  });
}

function renderFilter() {
  document.getElementById('filter-row').innerHTML = PADEL_DATA.players.map((p,i) => {
    const on = activeP.has(p.id);
    return `<button
      class="fb ${on?'on':''}"
      style="${on ? `--player-color:${COLORS[i]};` : ''}"
      data-player-toggle-id="${p.id}"
      data-player-toggle-index="${i}"
    >${p.name}</button>`;
  }).join('');
}

function toggleP(id, i, btn) {
  const ds = chart.data.datasets[i];
  ds.hidden = !ds.hidden;
  if (ds.hidden) { activeP.delete(id); btn.classList.remove('on'); btn.style = ''; }
  else { activeP.add(id); btn.classList.add('on'); btn.style = `--player-color:${COLORS[i]};`; }
  chart.update();
}

function toggleAll(on) {
  PADEL_DATA.players.forEach((p, i) => {
    chart.data.datasets[i].hidden = !on;
    if (on) activeP.add(p.id); else activeP.delete(p.id);
  });
  chart.update();
  renderFilter();
}

// ── INIT ──────────────────────────────────────────────────────────
async function initApp() {
  try {
    await loadActiveSeason();
    applySeasonMetadata();
    resetSeasonState();
    updateViewerPicker();
    renderHome();
    renderRanking();
    renderSpiele();
    renderStatistik();
    renderInfos();
  } catch (error) {
    document.querySelector('main').innerHTML = `<div class="empty-state">Die Saison-Daten konnten nicht geladen werden.</div>`;
    console.error(error);
  }
}

const mobileViewportQuery = window.matchMedia('(max-width: 768px)');
mobileViewportQuery.addEventListener?.('change', () => {
  if (PADEL_DATA) renderRanking();
});

initApp();
