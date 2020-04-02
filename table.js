function CreatedTable() {
  console.log('我执行了吗');
}

CreatedTable.prototype.created = function(arr, tableElement) {
  this.createdTableHhead(tableElement, arr[0]);
  this.createdTableTbody(tableElement, arr);
};
CreatedTable.prototype.createdTableHhead = function(tableElement, arr) {
  let theadEl = document.createElement('thead');
  let theadTrEl = document.createElement('tr');
  arr.forEach((v, i) => {
    let tdEl = document.createElement('td');
    tdEl.innerHTML = v.title;
    tdEl.style.width = v.width + 'px';

    theadTrEl.appendChild(tdEl);
  });
  theadEl.appendChild(theadTrEl);
  tableElement.appendChild(theadEl);
};

CreatedTable.prototype.createdTableTbody = function(tableElement, arr) {
  let theadList = arr[0];
  let tbodyList = arr[1];
  let tbodyEl = document.createElement('tbody');
  tbodyList.forEach((v, i) => {
    let trEl = document.createElement('tr');
    theadList.forEach((item, index) => {
      let tdEl = document.createElement('td');
      let pEl = document.createElement('p');
      let content = v[item.field];
      pEl.innerHTML = content || '';
      tdEl.setAttribute('data-index', `${i}-${index}`);
      tdEl.setAttribute('data-row', i);
      tdEl.setAttribute('data-col', index);

      tdEl.appendChild(pEl);
      trEl.appendChild(tdEl);
      pEl.addEventListener('blur', e => {
        this.blurUpdate(e, arr);
      });
    });
    tbodyEl.appendChild(trEl);
  });
  tableElement.appendChild(tbodyEl);

  tableElement.addEventListener('mousemove', e => {
    this.updateBgc(e, true);
  });

  tableElement.addEventListener('mouseout', e => {
    this.updateBgc(e, false);
  });

  tableElement.addEventListener('dblclick', e => {
    console.log(e, '我双击了');
    let pEl = e.target;

    if (!pEl || pEl.tagName !== 'P') return;

    pEl.contentEditable = true;
    pEl.focus();
  });
};

CreatedTable.prototype.blurUpdate = function(e, arr) {
  let el = e.target;
  el.contentEditable = false;
  let pContent = el.innerHTML;
  let indexStr = el.parentNode.getAttribute('data-index');
  let indexList = indexStr.split('-');
  let field = arr[0][indexList[1]].field;
  arr[1][indexList[0]][field] = pContent;

  console.log(arr, 'tableList');
  console.log(`[${indexList.join()}]`);
};

CreatedTable.prototype.updateBgc = function(e, boolean) {
  let targetEl = e.target;
  let tdEl = null;
  if (targetEl.tagName !== 'TD') {
    tdEl = targetEl.parentNode.tagName === 'TD' ? targetEl.parentNode : null;
  } else {
    tdEl = targetEl;
  }
  if (!tdEl) return;

  let indexStr = tdEl.getAttribute('data-index');
  // // 表头不能修改和hover变色效果
  if (!indexStr) return;

  let indexList = indexStr.split('-');
  let rowElArr = document.querySelectorAll(
    'td[data-row="' + indexList[0] + '"]'
  );
  let colElArr = document.querySelectorAll(
    'td[data-col="' + indexList[1] + '"]'
  );

  rowElArr.forEach(v => {
    if (boolean) {
      v.classList.add('active');
    } else {
      v.classList.remove('active');
    }
  });
  colElArr.forEach(v => {
    if (boolean) {
      v.classList.add('active');
    } else {
      v.classList.remove('active');
    }
  });
};
