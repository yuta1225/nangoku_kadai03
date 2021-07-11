var before_element = ''; // 直前の値
var formula = ''; // JavaScriptで演算可能な数式に変換してformulaに代入
var result = document.getElementById('result');

// 数式をリセットする
del = () =>  {
    result.value = '';
    formula = '';
}
// 直前の文字を削除する
cle = () => {
    word = result.value.slice(0, -1);
    result.value = word;
    formula = formula.slice(0, -1);
}
// 数値に関する処理
display = (number) => {
    if ('0' === number.value && '0' === result.value) { // 数値が0の時、連続で0を追加しない
        return;
    }
    else { 
        before_element = number.value;
        result.value += number.value;
        formula += number.value;
    }
}
// 演算子に関する処理
operate = (operator) => {
    // 数式の先頭に使えない演算子が来たら演算子を追加しない
    if(result.value === '') {
        switch (operator.value) {
            case '%':
                return;
            case '/':
                return;
            case '*':
                return;
        }
    }
    // 連続で演算子もしくは小数点が来たら演算子を追加しない
    var expression = ''; // 画面上で分かりやすい表記にしてexpressionに代入
    var ope = ''; // 演算子をJavaScript上で演算可能な表記にしてopeに代入
    if ('%' === before_element || '/' === before_element || '×' === before_element || '−' === before_element || '＋' === before_element || '.' === before_element) {
        return;
    } else {
        switch (operator.value) {
            case '÷':
                expression = ' ÷ '
                ope = '/';
                break;
        
            case '×':
                expression = ' × ';
                ope = '*';
                break;
        }
        switch (operator.value) {
            case '%':
                expression = ' % ';
                ope = '%'; 
                break;
        
            case '−':
                expression = ' − '
                ope = '-';
                break;

            case '＋':
                expression = ' ＋ '
                ope = '+';
        }
        before_element = operator.value;
        result.value += expression;
        formula += ope;
    }
}
// 少数(demical)に関する処理
demical = (point) => {
    if (result.value === '') { // 先頭に小数点を追加しない
        return;
    } else if ('%' === before_element || '/' === before_element || '×' === before_element || '−' === before_element || '＋' === before_element || '.' === before_element) {
        return; // 演算子の次に小数点を追加しない
    } else {
        before_element = point.value;
        result.value += point.value;
        formula += point.value;
    }
}
// 数式(formula)を計算して出力する
calculate = () => {
    fin = Function('"use strict";return ('+formula+')')();
    if (fin < 0) { // 分かりやすくするために負の演算子を全角表示にする
        fin = `− ${Math.abs(fin)}`;
    }
    // API用の左辺を変数に代入。なお、右辺はfinとなる
    lfFormula = result.value;

     // 最終的な計算結果を表示
    result.value = fin;
}
