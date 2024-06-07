chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message.type === "task1_1") {
            showUI("依據以下計畫徵件說明撰寫章節大綱");
        }
        if (message.type === "task1_2") {
            showUI("依據以下計畫章節與相關資料撰寫計畫章節內文");
        }

        if (message.type === "task2_1") {
            showUI("基於以下文章，以繁體中文出五題選擇題，每題四個選項，題目類型包括文意、修辭等範圍，並附上答案");
        }
        if (message.type === "task2_2") {
            showUI("依據以下資料，思考並架構在教學時，老師可能會遭遇的問題，請列表格寫出師生困境");
        }
        if (message.type === "task2_3") {
            showUI("請評價以下這篇作文而且附上三個建議，作文程度為國小五年級");
        }
    }
);

const taskUI = document.createElement('div');

const row1 = document.createElement('div');
const promptText_label = document.createElement('div');
const promptText = document.createElement('textarea');

const row2 = document.createElement('div');
const iuputText_label = document.createElement('div');
const iuputText = document.createElement('textarea');
const sendError = document.createElement('div');

const row3 = document.createElement('div');
const sendBtn = document.createElement('button');
const closeBtn = document.createElement('button');

const bg = document.createElement("div");

function initUI() {
    taskUI.classList.add('task-ui');

    row1.classList.add('row1');
    promptText_label.classList.add('prompt-text-label');
    promptText_label.innerText = "指令輸入框：";
    promptText.classList.add('prompt-text');

    row2.classList.add('row2');
    iuputText_label.classList.add('input-text-label');
    iuputText_label.innerText = "文章內容：";
    iuputText.classList.add('input-text');
    iuputText.placeholder = "請於此輸入框填入內容...";
    sendError.classList.add('send-error');

    row3.classList.add('row3');
    sendBtn.classList.add('send-btn');
    sendBtn.innerText = "Send";
    sendBtn.addEventListener("click", async function () {
        console.log("sendBtn event");
        if (iuputText.value.trim() !== '') {
            sendMsg(promptText.value.trim(), iuputText.value);
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

    row1.appendChild(promptText_label);
    row1.appendChild(promptText);
    taskUI.appendChild(row1);

    row2.appendChild(iuputText_label);
    row2.appendChild(iuputText);
    row2.appendChild(sendError);
    taskUI.appendChild(row2);

    row3.appendChild(sendBtn);
    row3.appendChild(closeBtn);
    taskUI.appendChild(row3);
}

initUI();

function showUI(prompt) {
    // taskText.innerText = prompt;
    promptText.placeholder = prompt;
    promptText.value = prompt;
    promptText.addEventListener("blur", async function () {
        if (promptText.value.trim() == '') {
            promptText.value = prompt;
        }
    });
    
    document.body.appendChild(taskUI);
    document.body.appendChild(bg);
}

function removeUI() {
    console.log("remove UI");
    iuputText.value = "";
    sendError.innerText = "";
    taskUI.remove();
    bg.remove();
}

function sendMsg(prompt, msg) {
    setFieldValue(prompt + "\n\n" + msg);
    clickSend();
    removeUI();
}

function setFieldValue(value) {
    var inputField = document.getElementById("prompt-textarea");
    inputField.value = value;
    inputField.dispatchEvent(new Event("input", { bubbles: true }));
    inputField.focus();

    // set textfield height
    if (inputField.scrollHeight < 200) {
        inputField.setAttribute("style", " max-height:200px; height:" + (inputField.scrollHeight) + "px; overflow-y: hidden;");
    } else {
        inputField.setAttribute("style", "max-height:200px; height:" + (inputField.scrollHeight) + "px;");
    }
}

function getSendBtn() {
    var element_1 = document.querySelectorAll('button[data-testid="fruitjuice-send-button"]');
    return element_1[0];
}

function clickSend() {
    var sendBtn = getSendBtn();
    sendBtn.click();
    canSend = false;
    sendBtn.disabled = false;
}