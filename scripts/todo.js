// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示

'use strict';

const todo = require('todo');
module.exports = (robot) => {
    /** robotのrespond関数: ボットの名前が一緒に呼び出された時のみ反応する関数
     * @param1 {string} 正規表現で「todo hoge」(大文字小文字問わない,hogeは文字列)形式であるもの
     * @param2 {function} 
     */
    robot.respond(/todo (.+)/i, (msg) => { // (.+)は任意の文字列の繰り返し、/iで大文字小文字問わない。()で括った部分をキャプチャしている
        const task = msg.match[1].trim();  // 上記でキャプチャしたものをmatch[1]で取得([0]には文章全部が入る)。trim関数で前後の空白を削除。
        todo.todo(task); // todoモジュールのtodo関数を呼び出し。
        msg.send('追加しました: ' + task); // send関数は「slackに送る」(リクエストをサーバーに送信)
    });

    robot.respond(/done (.+)/i, (msg) => {
        const task = msg.match[1].trim();
        todo.done(task);
        msg.send('完了にしました: ' + task);
    });
    robot.respond(/del (.+)/i, (msg) => {
        const task = msg.match[1].trim();
        todo.del(task);
        msg.send('削除しました: ' + task);
    });

    robot.respond(/list/i, (msg) => {
        const taskList = todo.list();
        if (taskList.length === 0) { // taskListが空配列かどうかの判定
            msg.send('(TODOはありません)');
        } else {
            msg.send(taskList.join('\n')); // join関数: 引数に与えられた文字列を使って、配列の全ての要素を結合する
        }
    });

    robot.respond(/donelist/i, (msg) => {
        const doneTaskList = todo.donelist()
        if (doneTaskList.length === 0) {
            msg.send('(完了したTODOはありません)');
        } else {
            msg.send(doneTaskList.join('\n'));
        }
    });
};
