(() => {
  'use strict';

  const STORAGE_KEY = 'pawprint-app-v1';
  const CITIES = ['上海', '北京', '杭州', '深圳', '广州'];
  const pageMeta = {
    dashboard: ['PAWPRINT DAILY', '今天也要和毛孩子一起幸福生活 🐾', '把每一次长大，都好好收藏。'],
    pets: ['MY FUR FAMILY', '我的宠物', '每一位家庭成员，都值得一份专属档案。'],
    health: ['HEALTH TRACKER', '健康记录', '认真记录日常，把安心留在每一天。'],
    timeline: ['GROWING TOGETHER', '成长时间线', '那些闪闪发光的小事，拼成了我们的故事。'],
    community: ['CITY PAW FRIENDS', '同城宠友社区', '发现同城养宠灵感，认识兴趣相投的新朋友。']
  };

  const defaults = {
    activePetId: 'pet-cheese',
    selectedCity: '上海',
    pets: [
      {
        id: 'pet-cheese', name: '奶酪', species: '狗狗', breed: '威尔士柯基犬', gender: '妹妹', birthday: '2023-03-18',
        weight: 11.6, health: '活力满满', homeDate: '2023-06-02', emoji: '🐶',
        image: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=900&q=85'
      }
    ],
    weights: [
      { id: 'w1', petId: 'pet-cheese', date: '2026-05-10', value: 10.8 },
      { id: 'w2', petId: 'pet-cheese', date: '2026-06-12', value: 11.1 },
      { id: 'w3', petId: 'pet-cheese', date: '2026-07-14', value: 11.3 },
      { id: 'w4', petId: 'pet-cheese', date: '2026-08-16', value: 11.2 },
      { id: 'w5', petId: 'pet-cheese', date: '2026-09-18', value: 11.5 },
      { id: 'w6', petId: 'pet-cheese', date: '2026-10-20', value: 11.6 }
    ],
    vaccines: [
      { id: 'v1', petId: 'pet-cheese', name: '狂犬疫苗', date: '2026-03-22', nextDate: '2027-03-22' },
      { id: 'v2', petId: 'pet-cheese', name: '犬八联疫苗', date: '2026-01-18', nextDate: '2027-01-18' }
    ],
    dewormings: [
      { id: 'd1', petId: 'pet-cheese', type: '体内驱虫', date: '2026-09-06', nextDate: '2026-12-06' },
      { id: 'd2', petId: 'pet-cheese', type: '体外驱虫', date: '2026-10-02', nextDate: '2026-11-02' }
    ],
    timeline: [
      { id: 't5', petId: 'pet-cheese', date: '2026-10-20', title: '秋日公园撒欢', description: '踩着落叶跑了好多圈，回家路上在车里睡得四脚朝天。', category: '日常', image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1000&q=84' },
      { id: 't4', petId: 'pet-cheese', date: '2026-09-18', title: '体重 11.5 kg', description: '这个月也在健康成长，医生说体态保持得很不错。', category: '健康', image: '' },
      { id: 't3', petId: 'pet-cheese', date: '2026-03-18', title: '三岁生日快乐', description: '给奶酪做了南瓜鸡肉小蛋糕，还戴上了最喜欢的橘色生日帽。', category: '生日', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1000&q=84' },
      { id: 't2', petId: 'pet-cheese', date: '2023-07-09', title: '第一次去公园', description: '第一次闻到草地和泥土的味道，遇见了三位新朋友。', category: '第一次', image: '' },
      { id: 't1', petId: 'pet-cheese', date: '2023-06-02', title: '第一天到家', description: '小小一团走进家门，从今天开始，我们就是一家人啦。', category: '里程碑', image: '' }
    ],
    friends: [
      { id: 'f1', name: '糯米妈妈', pet: '糯米 · 比熊', city: '上海', emoji: '🐩', tags: ['周末遛弯', '宠物摄影'] },
      { id: 'f2', name: '布丁和阿桃', pet: '布丁 · 金毛', city: '上海', emoji: '🦮', tags: ['飞盘', '露营'] },
      { id: 'f3', name: '七喜爸', pet: '七喜 · 柯基', city: '上海', emoji: '🐕', tags: ['柯基聚会', '探店'] },
      { id: 'f4', name: '卷卷日记', pet: '卷卷 · 贵宾', city: '杭州', emoji: '🐩', tags: ['西湖散步', '穿搭'] },
      { id: 'f5', name: '小满姐姐', pet: '小满 · 英短', city: '杭州', emoji: '🐈', tags: ['居家', '烘焙'] },
      { id: 'f6', name: '桃子汽水', pet: '桃子 · 萨摩耶', city: '北京', emoji: '🐕‍🦺', tags: ['雪地撒欢', '摄影'] },
      { id: 'f7', name: '旺仔同学', pet: '旺仔 · 柴犬', city: '深圳', emoji: '🐕', tags: ['海边', '夜跑'] },
      { id: 'f8', name: '小熊软糖', pet: '小熊 · 博美', city: '广州', emoji: '🐶', tags: ['早茶', '公园'] }
    ],
    posts: [
      { id: 'p1', author: '糯米妈妈', pet: '糯米 · 比熊', city: '上海', avatar: '🐩', time: '今天 10:24', text: '降温后的第一场梧桐树下散步，糯米一路都在认真收集秋天的味道 🍂', image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=84', likes: 48, liked: false },
      { id: 'p2', author: '布丁和阿桃', pet: '布丁 · 金毛', city: '上海', avatar: '🦮', time: '昨天 18:40', text: '世纪公园草坪很适合玩飞盘！周日下午准备再去，有同城小伙伴一起吗？', image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=84', likes: 76, liked: true },
      { id: 'p3', author: '卷卷日记', pet: '卷卷 · 贵宾', city: '杭州', avatar: '🐩', time: '2 小时前', text: '桂花开了，今天的散步路线自带香气。卷卷的新围巾也终于派上用场啦。', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=84', likes: 35, liked: false },
      { id: 'p4', author: '桃子汽水', pet: '桃子 · 萨摩耶', city: '北京', avatar: '🐕‍🦺', time: '今天 08:12', text: '清晨的奥森人少又舒服，白色毛球和金色阳光真的好搭。', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=84', likes: 92, liked: false },
      { id: 'p5', author: '旺仔同学', pet: '旺仔 · 柴犬', city: '深圳', avatar: '🐕', time: '昨天 20:05', text: '晚风刚刚好，海边慢走三公里打卡。今天也是认真运动的小狗！', image: '', likes: 27, liked: false },
      { id: 'p6', author: '小熊软糖', pet: '小熊 · 博美', city: '广州', avatar: '🐶', time: '3 天前', text: '第一次参加宠物友好早茶局，全程盯着虾饺但一口也没偷吃，奖励满分。', image: '', likes: 41, liked: false }
    ]
  };

  let state = loadState();
  let currentPage = 'dashboard';

  const el = {
    content: document.querySelector('#pageContent'),
    eyebrow: document.querySelector('#pageEyebrow'),
    title: document.querySelector('#pageTitle'),
    subtitle: document.querySelector('#pageSubtitle'),
    modal: document.querySelector('#modalBackdrop'),
    modalContent: document.querySelector('#modalContent'),
    toast: document.querySelector('#toast'),
    sidebar: document.querySelector('#sidebar')
  };

  function clone(value) { return JSON.parse(JSON.stringify(value)); }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || !Array.isArray(saved.pets) || !saved.pets.length) return clone(defaults);
      return { ...clone(defaults), ...saved };
    } catch (error) {
      console.warn('无法读取本地数据，已恢复示例数据。', error);
      return clone(defaults);
    }
  }

  function saveState(message) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      if (message) showToast(message);
    } catch (error) {
      console.error('保存失败', error);
      showToast('图片或数据过大，浏览器暂时无法保存');
    }
  }

  function uid(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`; }
  function todayISO() { return new Date().toISOString().slice(0, 10); }
  function escapeHTML(value = '') { return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]); }
  function formatDate(date) {
    if (!date) return '未设置';
    const [y, m, d] = date.split('-');
    return `${y}年${Number(m)}月${Number(d)}日`;
  }
  function shortDate(date) { const [, m, d] = date.split('-'); return `${Number(m)}.${String(d).padStart(2, '0')}`; }
  function daysBetween(from, to = todayISO()) { return Math.max(0, Math.floor((new Date(to) - new Date(from)) / 86400000)); }
  function ageText(birthday) {
    const months = Math.max(0, Math.floor(daysBetween(birthday) / 30.44));
    return months < 12 ? `${months} 个月` : `${Math.floor(months / 12)} 岁 ${months % 12 ? `${months % 12} 个月` : ''}`.trim();
  }
  function getPet() { return state.pets.find(p => p.id === state.activePetId) || state.pets[0]; }
  function petWeights() { return state.weights.filter(item => item.petId === getPet().id).sort((a, b) => a.date.localeCompare(b.date)); }
  function petItems(collection) { return collection.filter(item => item.petId === getPet().id); }
  function imageWithFallback(src, className, emoji, alt) {
    if (!src) return `<div class="${className}-fallback">${emoji}</div>`;
    return `<img class="${className}" src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
      <div class="${className}-fallback" style="display:none">${emoji}</div>`;
  }

  function showToast(message) {
    el.toast.textContent = message;
    el.toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => el.toast.classList.remove('show'), 2400);
  }

  function navigate(page) {
    currentPage = page;
    const meta = pageMeta[page];
    el.eyebrow.textContent = meta[0];
    el.title.innerHTML = escapeHTML(meta[1]).replace('🐾', '<span>🐾</span>');
    el.subtitle.textContent = meta[2];
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.page === page));
    renderPage();
    el.sidebar.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderPage() {
    const renderers = { dashboard: renderDashboard, pets: renderPets, health: renderHealth, timeline: renderTimeline, community: renderCommunity };
    el.content.innerHTML = renderers[currentPage]();
  }

  function reminderData() {
    const now = todayISO();
    const items = [];
    petItems(state.dewormings).forEach(item => items.push({ icon: '🛡️', title: item.type, date: item.nextDate, text: `上次完成于 ${formatDate(item.date)}` }));
    petItems(state.vaccines).forEach(item => items.push({ icon: '💉', title: item.name, date: item.nextDate, text: `上次接种于 ${formatDate(item.date)}` }));
    return items.sort((a, b) => a.date.localeCompare(b.date)).map(item => ({ ...item, days: Math.ceil((new Date(item.date) - new Date(now)) / 86400000) }));
  }

  function renderDashboard() {
    const pet = getPet();
    const weights = petWeights();
    const latestWeight = weights.at(-1)?.value ?? pet.weight;
    const events = petItems(state.timeline).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
    const reminders = reminderData().slice(0, 3);
    const friends = state.friends.filter(f => f.city === state.selectedCity).slice(0, 3);
    return `
      <div class="grid dashboard-grid">
        <article class="card pet-hero">
          <div class="pet-hero-content">
            <div>
              <span class="pet-kicker">♥ 我的毛孩子</span>
              <h2>${escapeHTML(pet.name)}</h2>
              <p class="pet-breed">${escapeHTML(pet.breed)} · ${escapeHTML(pet.gender)} · ${ageText(pet.birthday)}</p>
              <div class="pet-quick-stats">
                <div class="quick-stat"><strong>${latestWeight} kg</strong><span>当前体重</span></div>
                <div class="quick-stat"><strong>${daysBetween(pet.homeDate)} 天</strong><span>陪伴时光</span></div>
                <div class="quick-stat"><strong>${escapeHTML(pet.health)}</strong><span>健康状态</span></div>
              </div>
              <div class="pet-hero-actions">
                <button class="primary-button" data-page-link="pets">查看档案</button>
                <button class="secondary-button" data-modal="edit-pet">编辑资料</button>
              </div>
            </div>
            <div class="pet-photo-wrap">
              ${imageWithFallback(pet.image, 'pet-photo', pet.emoji, `${pet.name}的照片`)}
              <span class="health-dot">● 健康</span>
            </div>
          </div>
        </article>
        <article class="card reminder-panel">
          <div class="section-head"><div><h3>健康提醒</h3><p>别错过重要护理日期</p></div><button class="text-button" data-page-link="health">全部记录</button></div>
          <div class="reminder-list">${reminders.length ? reminders.map(reminder => `
            <div class="reminder-item"><span class="reminder-icon">${reminder.icon}</span><div><strong>${escapeHTML(reminder.title)}</strong><p>${escapeHTML(reminder.text)}</p></div><span class="due">${reminder.days < 0 ? '已到期' : reminder.days === 0 ? '今天' : `${reminder.days} 天后`}</span></div>
          `).join('') : '<p class="page-subtitle">暂时没有待办提醒。</p>'}</div>
        </article>
      </div>
      <div class="grid dashboard-lower">
        <article class="card card-pad">
          <div class="section-head"><div><h3>体重趋势</h3><p>近半年体重变化</p></div><button class="soft-button" data-modal="weight">＋ 记录体重</button></div>
          ${renderWeightChart(weights)}
        </article>
        <article class="card card-pad">
          <div class="section-head"><div><h3>最近成长</h3><p>和 ${escapeHTML(pet.name)} 的温暖片段</p></div><button class="text-button" data-page-link="timeline">查看时间线</button></div>
          <div class="mini-timeline">${events.map(event => miniEvent(event)).join('')}</div>
        </article>
      </div>
      <article class="card card-pad" style="margin-top:20px">
        <div class="section-head"><div><h3>${escapeHTML(state.selectedCity)} · 附近宠友</h3><p>基于示例城市数据为你推荐</p></div><button class="text-button" data-page-link="community">进入社区</button></div>
        <div class="friend-row">${friends.map(friendMini).join('') || '<div class="empty-state"><span>🐾</span><p>这个城市的宠友正在赶来</p></div>'}</div>
      </article>`;
  }

  function renderWeightChart(items) {
    if (!items.length) return '<div class="chart-empty">还没有体重数据，记录第一次称重吧。</div>';
    const data = items.slice(-6);
    const values = data.map(item => Number(item.value));
    const min = Math.min(...values) - 0.4;
    const max = Math.max(...values) + 0.4;
    const range = max - min || 1;
    const points = data.map((item, i) => ({ x: 35 + i * (430 / Math.max(1, data.length - 1)), y: 145 - ((item.value - min) / range) * 100, ...item }));
    const line = points.map(p => `${p.x},${p.y}`).join(' ');
    const area = `M ${points[0].x},145 L ${points.map(p => `${p.x},${p.y}`).join(' L ')} L ${points.at(-1).x},145 Z`;
    const change = values.length > 1 ? (values.at(-1) - values[0]).toFixed(1) : '0.0';
    return `<div class="chart-summary"><div><strong>${values.at(-1)} kg</strong><span>最近记录</span></div><div><strong>${Number(change) > 0 ? '+' : ''}${change} kg</strong><span>阶段变化</span></div></div>
      <div class="chart-wrap"><svg class="weight-chart" viewBox="0 0 500 180" role="img" aria-label="体重变化折线图" preserveAspectRatio="none">
        <defs><linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f78969" stop-opacity=".24"/><stop offset="100%" stop-color="#f78969" stop-opacity="0"/></linearGradient></defs>
        <line class="chart-grid-line" x1="35" y1="45" x2="465" y2="45"/><line class="chart-grid-line" x1="35" y1="95" x2="465" y2="95"/><line class="chart-grid-line" x1="35" y1="145" x2="465" y2="145"/>
        <path class="chart-area" d="${area}"/><polyline class="chart-path" points="${line}"/>
        ${points.map(p => `<circle class="chart-dot" cx="${p.x}" cy="${p.y}" r="5"/><text class="chart-value" x="${p.x}" y="${p.y - 12}" text-anchor="middle">${p.value}</text><text class="chart-label" x="${p.x}" y="166" text-anchor="middle">${shortDate(p.date)}</text>`).join('')}
      </svg></div>`;
  }

  function miniEvent(event) {
    const icons = { '健康': '⚕️', '生日': '🎂', '第一次': '✨', '里程碑': '🏡', '日常': '🌿' };
    return `<div class="mini-event"><div class="event-icon">${icons[event.category] || '🐾'}</div><div><time>${formatDate(event.date)}</time><h4>${escapeHTML(event.title)}</h4><p>${escapeHTML(event.description)}</p></div></div>`;
  }
  function friendMini(friend) { return `<div class="friend-mini"><div class="friend-avatar">${friend.emoji}</div><strong>${escapeHTML(friend.name)}</strong><span>${escapeHTML(friend.pet)} · ${escapeHTML(friend.city)}</span></div>`; }

  function renderPets() {
    const pet = getPet();
    const latest = petWeights().at(-1)?.value ?? pet.weight;
    return `
      <div class="page-actions"><div class="intro"><h2>毛孩子档案</h2><p>管理家庭里的每一位可爱成员</p></div><button class="primary-button" data-modal="add-pet">＋ 添加新宠物</button></div>
      <div class="pet-tabs">${state.pets.map(item => `<button class="pet-tab ${item.id === pet.id ? 'active' : ''}" data-pet-id="${item.id}">${item.emoji} ${escapeHTML(item.name)}</button>`).join('')}</div>
      <div class="grid pet-profile-layout">
        <article class="card pet-profile-photo-card">
          ${imageWithFallback(pet.image, 'profile-photo', pet.emoji, `${pet.name}的照片`)}
          <div class="profile-photo-caption"><h2>${escapeHTML(pet.name)}</h2><p>${escapeHTML(pet.breed)} · ${escapeHTML(pet.gender)}</p></div>
        </article>
        <div>
          <div class="stat-strip">
            <div class="stat-box"><b>${latest}<small> kg</small></b><span>当前体重</span></div>
            <div class="stat-box"><b>${daysBetween(pet.homeDate)}<small> 天</small></b><span>已陪伴</span></div>
            <div class="stat-box"><b>${ageText(pet.birthday).split(' ')[0]}</b><span>现在年龄 · ${ageText(pet.birthday)}</span></div>
          </div>
          <article class="card card-pad">
            <div class="section-head"><div><h3>基本资料</h3><p>属于 ${escapeHTML(pet.name)} 的身份小卡片</p></div><button class="soft-button" data-modal="edit-pet">✎ 编辑资料</button></div>
            <div class="info-grid">
              <div class="info-cell"><span>宠物昵称</span><strong>${escapeHTML(pet.name)}</strong></div>
              <div class="info-cell"><span>品种</span><strong>${escapeHTML(pet.breed)}</strong></div>
              <div class="info-cell"><span>性别</span><strong>${escapeHTML(pet.gender)}</strong></div>
              <div class="info-cell"><span>生日</span><strong>${formatDate(pet.birthday)}</strong></div>
              <div class="info-cell"><span>到家日期</span><strong>${formatDate(pet.homeDate)}</strong></div>
              <div class="info-cell"><span>健康状态</span><strong>🌿 ${escapeHTML(pet.health)}</strong></div>
            </div>
          </article>
        </div>
      </div>`;
  }

  function renderHealth() {
    const weights = petWeights();
    const vaccines = petItems(state.vaccines).sort((a, b) => b.date.localeCompare(a.date));
    const dewormings = petItems(state.dewormings).sort((a, b) => b.date.localeCompare(a.date));
    const reminders = reminderData().slice(0, 4);
    return `
      <div class="page-actions"><div class="intro"><h2>${escapeHTML(getPet().name)}的健康手账</h2><p>体重、疫苗和驱虫信息集中管理</p></div><div class="action-row"><button class="soft-button" data-modal="weight">＋ 体重</button><button class="soft-button" data-modal="vaccine">＋ 疫苗</button><button class="primary-button" data-modal="deworming">＋ 驱虫记录</button></div></div>
      <div class="grid health-layout">
        <div class="record-stack">
          <article class="card card-pad"><div class="section-head"><div><h3>体重变化</h3><p>记录日期与体重趋势</p></div><button class="text-button" data-modal="weight">添加记录</button></div>${renderWeightChart(weights)}</article>
          <article class="card card-pad"><div class="section-head"><div><h3>疫苗记录</h3><p>按计划完成接种更安心</p></div><button class="text-button" data-modal="vaccine">新增疫苗</button></div>
            ${vaccines.length ? `<table class="record-table"><thead><tr><th>疫苗名称</th><th>接种日期</th><th>下次接种</th><th>状态</th></tr></thead><tbody>${vaccines.map(v => `<tr><td><strong>${escapeHTML(v.name)}</strong></td><td>${formatDate(v.date)}</td><td>${formatDate(v.nextDate)}</td><td><span class="status-tag ${v.nextDate < todayISO() ? 'soon' : 'ok'}">${v.nextDate < todayISO() ? '待安排' : '已记录'}</span></td></tr>`).join('')}</tbody></table>` : emptyInline('💉', '还没有疫苗记录')}</article>
          <article class="card card-pad"><div class="section-head"><div><h3>驱虫记录</h3><p>体内外护理都不落下</p></div><button class="text-button" data-modal="deworming">新增记录</button></div>
            ${dewormings.length ? `<table class="record-table"><thead><tr><th>护理类型</th><th>最近完成</th><th>下次提醒</th></tr></thead><tbody>${dewormings.map(d => `<tr><td><strong>${escapeHTML(d.type)}</strong></td><td>${formatDate(d.date)}</td><td>${formatDate(d.nextDate)}</td></tr>`).join('')}</tbody></table>` : emptyInline('🛡️', '还没有驱虫记录')}</article>
        </div>
        <aside class="record-stack">
          <article class="card card-pad"><div class="section-head"><div><h3>近期提醒</h3><p>根据记录日期自动整理</p></div></div><div class="health-reminders">${reminders.map(item => `<div class="health-reminder"><strong>${item.icon} ${escapeHTML(item.title)}</strong><p>${item.days < 0 ? `已超过计划日期 ${Math.abs(item.days)} 天，请按实际情况安排。` : item.days === 0 ? '计划日期就是今天，记得及时处理。' : `距离计划日期还有 ${item.days} 天，建议提前做好准备。`}</p></div>`).join('') || '<p class="page-subtitle">暂无待办提醒</p>'}</div></article>
          <article class="card warm-note"><span class="big-emoji">🩺</span><h3>健康记录小建议</h3><p>固定时间、相同状态下称重，趋势会更有参考价值。护理信息仅用于日常记录，如有异常请及时咨询专业兽医。</p></article>
        </aside>
      </div>`;
  }

  function emptyInline(emoji, text) { return `<div class="empty-state"><span>${emoji}</span><p>${text}</p></div>`; }

  function renderTimeline() {
    const items = petItems(state.timeline).sort((a, b) => b.date.localeCompare(a.date));
    return `
      <div class="page-actions"><div class="intro"><h2>和 ${escapeHTML(getPet().name)} 一起长大</h2><p>已经收藏了 ${items.length} 个值得纪念的片段</p></div><button class="primary-button" data-modal="timeline">＋ 写成长日记</button></div>
      <div class="grid timeline-layout">
        <div class="timeline">${items.length ? items.map(event => `<article class="timeline-entry"><div class="card timeline-card">${event.image ? `<img class="timeline-image" src="${escapeHTML(event.image)}" alt="${escapeHTML(event.title)}" onerror="this.remove()">` : ''}<div class="timeline-body"><span class="timeline-date">${formatDate(event.date)}</span><h3>${escapeHTML(event.title)}</h3><p>${escapeHTML(event.description)}</p><span class="category-tag">${escapeHTML(event.category)}</span></div></div></article>`).join('') : emptyInline('📖', '还没有故事，写下第一篇成长日记吧')}</div>
        <aside class="timeline-aside"><article class="card warm-note"><span class="big-emoji">📷</span><h3>平凡日子也闪光</h3><p>不只记录“大事件”。一次散步、一个新表情、今天吃得特别香，都值得成为未来会微笑的回忆。</p><button class="primary-button" style="margin-top:18px;width:100%" data-modal="timeline">记录今天</button></article></aside>
      </div>`;
  }

  function renderCommunity() {
    const posts = state.posts.filter(p => p.city === state.selectedCity);
    const friends = state.friends.filter(f => f.city === state.selectedCity);
    return `
      <div class="community-toolbar"><div class="city-tabs" aria-label="选择城市">${CITIES.map(city => `<button class="city-tab ${city === state.selectedCity ? 'active' : ''}" data-city="${city}">${city}</button>`).join('')}</div><button class="primary-button" data-modal="post">＋ 发布文字动态</button></div>
      <div class="grid community-layout">
        <div class="feed">${posts.length ? posts.map(postCard).join('') : emptyInline('🌱', '这里还没有动态，来发布第一条吧')}</div>
        <aside class="record-stack">
          <article class="card card-pad"><div class="section-head"><div><h3>附近宠友</h3><p>${escapeHTML(state.selectedCity)} · 示例推荐</p></div></div><div class="nearby-list">${friends.length ? friends.map(nearbyFriend).join('') : '<p class="page-subtitle">暂无推荐</p>'}</div></article>
          <article class="card card-pad"><div class="section-head"><div><h3>关于同城社区</h3></div></div><p class="page-subtitle" style="line-height:1.8">当前为纯静态演示，城市匹配和动态均由本地 Mock Data 模拟，不提供真实定位、聊天或跨用户同步。</p></article>
        </aside>
      </div>`;
  }

  function postCard(post) {
    return `<article class="card post-card"><div class="post-head"><div class="post-avatar">${post.avatar}</div><div class="post-author"><strong>${escapeHTML(post.author)}</strong><span>${escapeHTML(post.pet)} · ${escapeHTML(post.time)}</span></div><span class="city-mark">⌖ ${escapeHTML(post.city)}</span></div><div class="post-text">${escapeHTML(post.text)}</div>${post.image ? `<img class="post-image" src="${escapeHTML(post.image)}" alt="宠友动态图片" onerror="this.remove()">` : ''}<div class="post-actions"><button class="like-button ${post.liked ? 'liked' : ''}" data-like="${post.id}" aria-label="${post.liked ? '取消点赞' : '点赞'}">${post.liked ? '♥' : '♡'} <span>${post.likes}</span></button><span class="demo-label">本地社区演示</span></div></article>`;
  }

  function nearbyFriend(friend) {
    return `<div class="nearby-friend"><div class="friend-avatar">${friend.emoji}</div><div><strong>${escapeHTML(friend.name)}</strong><span>${escapeHTML(friend.pet)}</span><div class="interest-tags">${friend.tags.map(tag => `<i class="tag">${escapeHTML(tag)}</i>`).join('')}</div></div></div>`;
  }

  function openModal(type) {
    const forms = { 'edit-pet': () => petForm(getPet(), true), 'add-pet': () => petForm(null, false), weight: weightForm, vaccine: vaccineForm, deworming: dewormingForm, timeline: timelineForm, post: postForm };
    el.modalContent.innerHTML = forms[type]();
    el.modal.hidden = false;
    document.body.style.overflow = 'hidden';
    const form = el.modalContent.querySelector('form');
    if (form) form.addEventListener('submit', handleFormSubmit);
    const fileInput = el.modalContent.querySelector('#timelineImage');
    if (fileInput) fileInput.addEventListener('change', previewUpload);
    el.modalContent.querySelector('input, select, textarea')?.focus();
  }

  function closeModal() {
    el.modal.hidden = true;
    document.body.style.overflow = '';
    el.modalContent.innerHTML = '';
  }

  function petForm(pet, editing) {
    const data = pet || { name: '', species: '狗狗', breed: '', gender: '妹妹', birthday: '', weight: '', health: '活力满满', homeDate: todayISO(), emoji: '🐶', image: '' };
    return `<h2 id="modalTitle">${editing ? `编辑${escapeHTML(data.name)}的资料` : '添加新宠物'}</h2><p class="modal-intro">把毛孩子的基本信息认真记下来。</p><form data-form="pet" data-editing="${editing}">
      <div class="form-grid">
        <div class="form-field"><label>昵称 *</label><input name="name" required maxlength="12" value="${escapeHTML(data.name)}"></div>
        <div class="form-field"><label>品种 *</label><input name="breed" required maxlength="24" value="${escapeHTML(data.breed)}" placeholder="例如：威尔士柯基犬"></div>
        <div class="form-field"><label>类型</label><select name="species"><option ${data.species === '狗狗' ? 'selected' : ''}>狗狗</option><option ${data.species === '猫咪' ? 'selected' : ''}>猫咪</option><option ${data.species === '其他' ? 'selected' : ''}>其他</option></select></div>
        <div class="form-field"><label>性别</label><select name="gender"><option ${data.gender === '妹妹' ? 'selected' : ''}>妹妹</option><option ${data.gender === '弟弟' ? 'selected' : ''}>弟弟</option></select></div>
        <div class="form-field"><label>生日 *</label><input type="date" name="birthday" required value="${data.birthday}" max="${todayISO()}"></div>
        <div class="form-field"><label>到家日期 *</label><input type="date" name="homeDate" required value="${data.homeDate}" max="${todayISO()}"></div>
        <div class="form-field"><label>当前体重（kg）</label><input type="number" name="weight" min="0.1" max="200" step="0.1" value="${data.weight}"></div>
        <div class="form-field"><label>健康状态</label><input name="health" maxlength="12" value="${escapeHTML(data.health)}"></div>
        <div class="form-field"><label>头像 Emoji</label><input name="emoji" maxlength="4" value="${escapeHTML(data.emoji)}"></div>
        <div class="form-field"><label>照片链接（可选）</label><input type="url" name="image" value="${escapeHTML(data.image)}" placeholder="https://..."></div>
      </div><div class="form-actions"><button type="button" class="secondary-button" data-close-modal>取消</button><button class="primary-button" type="submit">保存资料</button></div></form>`;
  }

  function weightForm() { return basicRecordForm('记录体重', '每一次小变化，都是健康趋势的一部分。', 'weight', `<div class="form-field"><label>记录日期 *</label><input name="date" type="date" required value="${todayISO()}" max="${todayISO()}"></div><div class="form-field"><label>体重（kg）*</label><input name="value" type="number" required min="0.1" max="200" step="0.1" placeholder="例如 11.6"></div>`); }
  function vaccineForm() { return basicRecordForm('新增疫苗记录', '记录接种时间，也为下一次做好准备。', 'vaccine', `<div class="form-field full"><label>疫苗名称 *</label><input name="name" required maxlength="30" placeholder="例如：犬八联疫苗"></div><div class="form-field"><label>接种日期 *</label><input name="date" type="date" required value="${todayISO()}" max="${todayISO()}"></div><div class="form-field"><label>下次接种日期 *</label><input name="nextDate" type="date" required></div>`); }
  function dewormingForm() { return basicRecordForm('新增驱虫记录', '把每次护理安排得明明白白。', 'deworming', `<div class="form-field full"><label>护理类型 *</label><select name="type"><option>体内驱虫</option><option>体外驱虫</option><option>体内外同驱</option></select></div><div class="form-field"><label>最近驱虫日期 *</label><input name="date" type="date" required value="${todayISO()}" max="${todayISO()}"></div><div class="form-field"><label>下次提醒日期 *</label><input name="nextDate" type="date" required></div>`); }
  function basicRecordForm(title, intro, type, fields) { return `<h2 id="modalTitle">${title}</h2><p class="modal-intro">${intro}</p><form data-form="${type}"><div class="form-grid">${fields}</div><div class="form-actions"><button type="button" class="secondary-button" data-close-modal>取消</button><button type="submit" class="primary-button">保存记录</button></div></form>`; }
  function timelineForm() { return `<h2 id="modalTitle">写成长日记</h2><p class="modal-intro">今天发生了什么值得记住的小事？</p><form data-form="timeline"><div class="form-grid"><div class="form-field"><label>日期 *</label><input type="date" name="date" required value="${todayISO()}" max="${todayISO()}"></div><div class="form-field"><label>类别</label><select name="category"><option>日常</option><option>第一次</option><option>健康</option><option>生日</option><option>里程碑</option></select></div><div class="form-field full"><label>标题 *</label><input name="title" required maxlength="36" placeholder="给今天的故事起个名字"></div><div class="form-field full"><label>故事内容 *</label><textarea name="description" required maxlength="500" placeholder="写下想留住的细节……"></textarea></div><div class="form-field full"><label>上传照片（可选）</label><input id="timelineImage" type="file" accept="image/*"><p class="form-note">图片会转换后保存在当前浏览器中，建议选择 1.5MB 以内的照片。</p><img id="imagePreview" class="image-preview" alt="上传预览"></div></div><div class="form-actions"><button type="button" class="secondary-button" data-close-modal>取消</button><button type="submit" class="primary-button">保存日记</button></div></form>`; }
  function postForm() { return `<h2 id="modalTitle">发布同城动态</h2><p class="modal-intro">分享你和毛孩子此刻的小日常。</p><form data-form="post"><div class="form-grid"><div class="form-field full"><label>发布城市</label><select name="city">${CITIES.map(city => `<option ${city === state.selectedCity ? 'selected' : ''}>${city}</option>`).join('')}</select></div><div class="form-field full"><label>动态内容 *</label><textarea name="text" required maxlength="280" placeholder="分享散步路线、养宠心得或今天的可爱瞬间……"></textarea></div></div><p class="form-note">这是本地静态演示，内容仅保存在你的当前浏览器中。</p><div class="form-actions"><button type="button" class="secondary-button" data-close-modal>取消</button><button type="submit" class="primary-button">发布动态</button></div></form>`; }

  function previewUpload(event) {
    const file = event.target.files[0];
    const preview = document.querySelector('#imagePreview');
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) { event.target.value = ''; preview.classList.remove('visible'); showToast('请选择 1.5MB 以内的图片'); return; }
    const reader = new FileReader();
    reader.onload = () => { preview.src = reader.result; preview.classList.add('visible'); };
    reader.readAsDataURL(file);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const pet = getPet();
    if (data.nextDate && data.date && data.nextDate <= data.date) { showToast('下次日期需要晚于本次日期'); return; }
    switch (form.dataset.form) {
      case 'pet': {
        const petData = { name: data.name.trim(), breed: data.breed.trim(), species: data.species, gender: data.gender, birthday: data.birthday, homeDate: data.homeDate, weight: Number(data.weight) || 0, health: data.health.trim() || '状态不错', emoji: data.emoji.trim() || (data.species === '猫咪' ? '🐱' : '🐶'), image: data.image.trim() };
        if (form.dataset.editing === 'true') Object.assign(pet, petData);
        else { petData.id = uid('pet'); state.pets.push(petData); state.activePetId = petData.id; }
        saveState(form.dataset.editing === 'true' ? '宠物资料已更新' : '新成员已加入家庭'); break;
      }
      case 'weight': {
        const record = { id: uid('weight'), petId: pet.id, date: data.date, value: Number(data.value) };
        const sameDay = state.weights.find(w => w.petId === pet.id && w.date === data.date);
        if (sameDay) sameDay.value = record.value; else state.weights.push(record);
        pet.weight = record.value;
        state.timeline.push({ id: uid('timeline'), petId: pet.id, date: data.date, title: `体重 ${record.value} kg`, description: '完成了一次日常体重记录，继续保持健康生活。', category: '健康', image: '' });
        saveState('体重记录已保存'); break;
      }
      case 'vaccine': state.vaccines.push({ id: uid('vaccine'), petId: pet.id, name: data.name.trim(), date: data.date, nextDate: data.nextDate }); state.timeline.push({ id: uid('timeline'), petId: pet.id, date: data.date, title: `完成${data.name.trim()}接种`, description: `下次计划接种日期：${formatDate(data.nextDate)}。`, category: '健康', image: '' }); saveState('疫苗记录已保存'); break;
      case 'deworming': state.dewormings.push({ id: uid('deworming'), petId: pet.id, type: data.type, date: data.date, nextDate: data.nextDate }); saveState('驱虫记录已保存'); break;
      case 'timeline': state.timeline.push({ id: uid('timeline'), petId: pet.id, date: data.date, title: data.title.trim(), description: data.description.trim(), category: data.category, image: document.querySelector('#imagePreview')?.src || '' }); saveState('成长日记已珍藏'); break;
      case 'post': state.selectedCity = data.city; state.posts.unshift({ id: uid('post'), author: `${pet.name}的家长`, pet: `${pet.name} · ${pet.breed}`, city: data.city, avatar: pet.emoji, time: '刚刚', text: data.text.trim(), image: '', likes: 0, liked: false }); saveState('动态已发布到本地社区'); break;
    }
    document.querySelector('#topPetName').textContent = getPet().name;
    closeModal();
    renderPage();
  }

  document.addEventListener('click', event => {
    const nav = event.target.closest('[data-page]');
    if (nav) navigate(nav.dataset.page);
    const link = event.target.closest('[data-page-link]');
    if (link) navigate(link.dataset.pageLink);
    const modal = event.target.closest('[data-modal]');
    if (modal) openModal(modal.dataset.modal);
    if (event.target.closest('[data-action="open-pet"]')) navigate('pets');
    if (event.target.closest('[data-close-modal], .modal-close') || event.target === el.modal) closeModal();
    const petTab = event.target.closest('[data-pet-id]');
    if (petTab) { state.activePetId = petTab.dataset.petId; saveState(); document.querySelector('#topPetName').textContent = getPet().name; renderPage(); }
    const city = event.target.closest('[data-city]');
    if (city) { state.selectedCity = city.dataset.city; saveState(); renderPage(); }
    const like = event.target.closest('[data-like]');
    if (like) { const post = state.posts.find(p => p.id === like.dataset.like); post.liked = !post.liked; post.likes += post.liked ? 1 : -1; saveState(); renderPage(); }
  });

  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !el.modal.hidden) closeModal(); });
  document.querySelector('#menuToggle').addEventListener('click', () => el.sidebar.classList.toggle('open'));
  document.querySelector('#todayText').textContent = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' }).format(new Date());
  document.querySelector('#topPetName').textContent = getPet().name;
  renderPage();
})();
