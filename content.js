chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message.type === "task1") {
            showUI("基於以下文章，以繁體中文出五題選擇題，每題四個選項，題目類型包括文意、修辭等範圍，並附上答案");
        }
        if (message.type === "task2") {
            showUI("依據以下計畫徵件說明撰寫章節大綱");
        }
        if (message.type === "task3") {
            showUI("依據以下計畫章節與相關資料撰寫計畫章節內文");
        }
        if (message.type === "task4") {
            showUI("依據以下資料，思考並架構在教學時，老師可能會遭遇的問題，請列表格寫出師生困境");
        }
    }
);

const taskUI = document.createElement('div');
const row1 = document.createElement('div');
const taskText = document.createElement('div');
const iuputText = document.createElement('textarea');
const sendError = document.createElement('div');
const row2 = document.createElement('div');
const sendBtn = document.createElement('button');
const closeBtn = document.createElement('button');
const bg = document.createElement("div");

function initUI() {
    taskUI.classList.add('task-ui');
    row1.classList.add('row1');
    taskText.classList.add('task-text');
    sendError.classList.add('send-error');

    row2.classList.add('row2');
    sendBtn.classList.add('send-btn');
    sendBtn.innerText = "Send";
    sendBtn.addEventListener("click", async function () {
        if (iuputText.value.trim() != '') {
            sendMsg(taskText.innerText, iuputText.value);
        } else {
            sendError.innerText = "輸入不得為空值！";
        }
    });

    closeBtn.classList.add('close-btn');
    closeBtn.innerText = "Close";
    closeBtn.addEventListener("click", async function () {
        removeUI();
    });

    bg.classList.add("alert-bg");

    row1.appendChild(taskText);
    row1.appendChild(iuputText);
    row1.appendChild(sendError);
    taskUI.appendChild(row1);
    row2.appendChild(sendBtn);
    row2.appendChild(closeBtn);
    taskUI.appendChild(row2);
}

initUI();

function showUI(prompt) {
    taskText.innerText = prompt;
    document.body.appendChild(taskUI);
    document.body.appendChild(bg);
}

function removeUI() {
    iuputText.value = "";
    sendError.innerText = "";
    taskUI.remove();
    bg.remove();
}

function sendMsg(prompt, msg) {
    console.log(prompt + "\n\n" + msg);
    setFieldValue(prompt + "\n\n" + msg);
    checkFieldValue(taskText.innerText);
    removeUI();
}

function setFieldValue(value) {
    var inputField = document.getElementsByTagName("textarea")[0];
    inputField.value = value;

    // set textfield height
    if (inputField.scrollHeight < 200) {
        inputField.setAttribute("style", " max-height:200px; height:" + (inputField.scrollHeight) + "px; overflow-y: hidden;");
    } else {
        inputField.setAttribute("style", "max-height:200px; height:" + (inputField.scrollHeight) + "px;");
    }
}

function getSendBtn() {
    var element_1 = document.querySelectorAll('button.absolute.p-1');
    return element_1[0];
}

function checkFieldValue(value) {
    var sendBtn = getSendBtn();

    // enable button
    if (value != "") {
        sendBtn.disabled = false;
    } else {
        sendBtn.disabled = true;
    }
}