/* Lightweight quiz engine for Shopify section Quiz */
(function(){
  function $(sel, root){ return (root||document).querySelector(sel); }
  function $all(sel, root){ return Array.prototype.slice.call((root||document).querySelectorAll(sel)); }

  function parseJSON(text, fallback){
    try { return JSON.parse(text); } catch(e){ return fallback; }
  }

  function toBool(v){ return String(v).toLowerCase() === 'true'; }

  function bootQuiz(section){
    var id = section.id.replace('quiz-','');
    var cfgEl = $('#quiz-data-' + id);
    if(!cfgEl) return;
    var data = parseJSON(cfgEl.textContent || '{}', {});
    var method = section.dataset.method || 'highest_category';
    var showProgress = toBool(section.dataset.showProgress);
    var persist = toBool(section.dataset.persist);
    var restartEnabled = toBool(section.dataset.restartEnabled);

    var questions = Array.isArray(data.questions) ? data.questions : [];
    var results = Array.isArray(data.results) ? data.results : [];

    // Normalise options & collect categories
    var categories = new Set();
    questions.forEach(function(q){
      if(typeof q.options === 'string'){ q.options = parseJSON(q.options, []); }
      q.options = Array.isArray(q.options) ? q.options : [];
      q.options.forEach(function(opt){
        if(opt && opt.weights){ Object.keys(opt.weights).forEach(function(k){ categories.add(k); }); }
      });
    });

    var state = {
      index: 0,
      answers: new Array(questions.length).fill(null),
      scores: Array.from(categories).reduce(function(acc,k){ acc[k]=0; return acc; }, {}),
      tags: []
    };

    var key = 'quiz-state-' + id;
    if(persist){
      var saved = parseJSON(localStorage.getItem(key) || '{}', {});
      if(saved && saved.answers && saved.scores){ state = saved; }
    }

    var elProgress = $('.quiz-progress', section);
    var elCard = $('.quiz-card', section);
    var elResult = $('.quiz-result', section);

    function renderProgress(){
      if(!showProgress) return;
      elProgress.textContent = 'Câu ' + Math.min(state.index+1, questions.length) + '/' + questions.length;
    }

    function save(){ if(persist){ localStorage.setItem(key, JSON.stringify(state)); } }

    function renderQuestion(){
      var q = questions[state.index];
      if(!q){ return showResult(); }
      renderProgress();
      elCard.innerHTML = '';
      var title = document.createElement('div');
      title.className = 'quiz-question__title';
      title.textContent = q.text || 'Câu hỏi';
      elCard.appendChild(title);

      var list = document.createElement('div');
      list.className = 'quiz-options';
      q.options.forEach(function(opt, i){
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option';
        btn.textContent = opt.label || ('Lựa chọn ' + (i+1));
        btn.setAttribute('data-index', i);
        btn.addEventListener('click', function(){ selectOption(i, opt); });
        list.appendChild(btn);
      });
      elCard.appendChild(list);

      var controls = document.createElement('div');
      controls.className = 'quiz-controls';
      if(state.index > 0){
        var back = document.createElement('button');
        back.className = 'quiz-btn-secondary';
        back.textContent = 'Quay lại';
        back.addEventListener('click', function(){ state.index--; renderQuestion(); });
        controls.appendChild(back);
      }
      elCard.appendChild(controls);
      section.classList.remove('show-result');
      elResult.hidden = true;
      elCard.setAttribute('data-state','question');
    }

    function selectOption(idx, opt){
      state.answers[state.index] = idx;
      if(opt && opt.weights){
        Object.keys(opt.weights).forEach(function(k){
          var val = Number(opt.weights[k]) || 0;
          state.scores[k] = (state.scores[k] || 0) + val;
        });
      }
      if(opt && Array.isArray(opt.tags)){
        state.tags = state.tags.concat(opt.tags);
      }
      save();
      // Next question or result
      state.index++;
      if(state.index >= questions.length){ showResult(); }
      else { renderQuestion(); }
    }

    function evaluateRules(rule){
      // Support { any: [cond...] } or { all: [cond...] }
      if(!rule || typeof rule !== 'object') return false;
      function checkCond(cond){
        if(cond.category){
          var sc = state.scores[cond.category] || 0;
          if(cond.gte != null && !(sc >= Number(cond.gte))) return false;
          if(cond.lte != null && !(sc <= Number(cond.lte))) return false;
          if(cond.eq  != null && !(sc === Number(cond.eq))) return false;
          return true;
        }
        if(cond.tags){
          var need = Array.isArray(cond.tags) ? cond.tags : [cond.tags];
          return need.some(function(t){ return state.tags.indexOf(t) !== -1; });
        }
        return false;
      }
      if(Array.isArray(rule.all)){
        return rule.all.every(checkCond);
      }
      if(Array.isArray(rule.any)){
        return rule.any.some(checkCond);
      }
      return false;
    }

    function pickResult(){
      if(method === 'rules'){
        for(var i=0;i<results.length;i++){
          var r = results[i];
          if(typeof r.rule === 'string'){ r.rule = parseJSON(r.rule, {}); }
          if(evaluateRules(r.rule)) return r;
        }
      }
      // highest_category fallback
      var bestKey = null, bestVal = -Infinity;
      Object.keys(state.scores).forEach(function(k){
        var val = state.scores[k] || 0;
        if(val > bestVal){ bestVal = val; bestKey = k; }
      });
      for(var j=0;j<results.length;j++){
        if(results[j].category_key === bestKey) return results[j];
      }
      return results[0] || null;
    }

    function showResult(){
      var r = pickResult();
      if(!r){ elCard.innerHTML = '<p>Không tìm thấy kết luận phù hợp.</p>'; return; }
      $('.quiz-result__title', section).textContent = r.title || '';
      $('.quiz-result__desc', section).innerHTML = r.desc || '';
      var media = $('.quiz-result__media', section);
      media.innerHTML = '';
      if(r.image){
        var img = document.createElement('img');
        img.src = r.image; img.alt = r.title || '';
        media.appendChild(img);
      }
      var ctaWrap = $('.quiz-result__cta', section);
      ctaWrap.innerHTML = '';
      if(r.cta && r.cta.label && r.cta.link){
        var a = document.createElement('a'); a.className='quiz-btn-primary'; a.href=r.cta.link; a.textContent=r.cta.label; ctaWrap.appendChild(a);
      }
      if(restartEnabled){
        var restart = document.createElement('button'); restart.className='quiz-btn-secondary'; restart.textContent='Làm lại'; restart.addEventListener('click', function(){ restartQuiz(); }); ctaWrap.appendChild(restart);
      }
      section.classList.add('show-result');
      elResult.hidden = false; elCard.setAttribute('data-state','result');
      renderProgress();
    }

    function restartQuiz(){
      state.index = 0; state.answers = new Array(questions.length).fill(null);
      Object.keys(state.scores).forEach(function(k){ state.scores[k]=0; });
      state.tags = [];
      save();
      renderQuestion();
    }

    // Start
    if(state.index >= questions.length){ showResult(); }
    else { renderQuestion(); }
  }

  function init(){
    $all('.quiz-section').forEach(bootQuiz);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();