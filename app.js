const canvas = document.getElementById("myCanvasPartD");
const ctx = canvas.getContext("2d");
const unit = 20;
const row = canvas.height / unit;
const column = canvas.width / unit;

const ctxLineWidth = 3;
ctx.lineWidth = ctxLineWidth;
ctx.font = "16px Arial"; // 設置文字的字體和大小

const imageUp = new Image();
imageUp.src = "https://img.icons8.com/quill/50/000000/up.png";

const imageDown = new Image();
imageDown.src = "https://img.icons8.com/quill/50/down.png";

const zero = new Image();
zero.src = "./images/zero.png";
const onePerson = new Image();
onePerson.src = "./images/one.png";
const twoPeople = new Image();
twoPeople.src = "./images/two.png";
const threePeople = new Image();
threePeople.src = "./images/three.png";
const fourPeople = new Image();
fourPeople.src = "./images/four.png";
const fivePeople = new Image();
fivePeople.src = "./images/five.png";
const sixpeople = new Image();
sixpeople.src = "./images/six.png";
const sevenpeople = new Image();
sevenpeople.src = "./images/seven.png";

let people = 40;
let peopleInfo = [];
let numberOfPeopleArrived = 0;
let time = 0;
let leftElevator = [];
let drawPassengerGetIntoTheLeftElevator;
let drawPassengerGetOutTheLeftElevator;

let numberOfPassengerGetOutTheLeftElevator = 0;

let leftElevatorInfo = {
  direction: "",
  currentFloor: "0",
  endFloor: "0",
  currentPeople: "0",
  basicTarget: "none",
  futureDirection: "",
};

let leftElevatorPassenger = [];

let upButton = [];
let downButton = [];

function creareElevatorLeft() {
  let yLocation = 560;
  for (let i = 0; i < 10; i++) {
    leftElevator.push({ x: 120, y: yLocation });
    yLocation -= 60;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(leftElevator[i].x, leftElevator[i].y, 120, 50);
    ctx.strokeRect(leftElevator[i].x, leftElevator[i].y, 120, 50);
  }
}

function createUpButton() {
  let yLocation = 570;
  for (let i = 0; i < 10; i++) {
    upButton.push({ x: 310, y: yLocation });
    yLocation -= 60;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.drawImage(imageUp, upButton[i].x, upButton[i].y, 30, 30);
    ctx.strokeRect(upButton[i].x, upButton[i].y, 30, 30);
  }
}
function createDownButton() {
  let yLocation = 570;
  for (let i = 0; i < 10; i++) {
    downButton.push({ x: 350, y: yLocation });
    yLocation -= 60;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.drawImage(imageDown, downButton[i].x, downButton[i].y, 30, 30);

    ctx.strokeRect(downButton[i].x, downButton[i].y, 30, 30);
  }
}
function drawPeopleCount() {
  ctx.fillStyle = "black"; // 設置文字的顏色
  ctx.fillText("剩餘人數: " + people, 300, 15); // 在指定位置繪製人數信息
}

function totalTime() {
  ctx.fillStyle = "black"; // 設置文字的顏色
  ctx.fillText("目前所經過秒數: " + time, 285, 620); // 在指定位置繪製人數信息
}

creareElevatorLeft();
createUpButton();
createDownButton();
drawPeopleCount();
totalTime();

//繪製左邊電梯目前位置
for (let i = 0; i < 10; i++) {
  console.log(
    "初始化，當前左邊電梯在 " + leftElevatorInfo.currentFloor + " 樓"
  );
  if (i == leftElevatorInfo.currentFloor) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "red";
    ctx.fillRect(leftElevator[i].x, leftElevator[i].y, 120, 50);
    ctx.strokeRect(leftElevator[i].x, leftElevator[i].y, 120, 50);
  }
}

function draw() {
  //重置
  ctx.fillStyle = "lightcyan";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //繪製剩餘人數
  drawPeopleCount();
  // 繪製總電梯
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(leftElevator[i].x, leftElevator[i].y, 120, 50);
    ctx.strokeRect(leftElevator[i].x, leftElevator[i].y, 120, 50);
    ctx.drawImage(imageUp, upButton[i].x, upButton[i].y, 30, 30);
    ctx.strokeRect(upButton[i].x, upButton[i].y, 30, 30);
    ctx.drawImage(imageDown, downButton[i].x, downButton[i].y, 30, 30);
    ctx.strokeRect(downButton[i].x, downButton[i].y, 30, 30);
  }

  //模擬人隨機按電梯按鈕
  if (people > 0) {
    //隨機選擇出現樓層
    let chooseFloor = Math.floor(Math.random() * 10);

    //隨機選擇樓層出電梯
    let chooseFloorOut = Math.floor(Math.random() * 10);

    //先判斷時否有進出樓層是否有重覆，沒有的話，透過進出樓層判斷選擇電梯按鈕為上或下
    let direction;
    while (chooseFloorOut == chooseFloor) {
      //console.log("樓層重覆");
      chooseFloorOut = Math.floor(Math.random() * 10);
    }
    if (chooseFloorOut > chooseFloor) {
      direction = "up";
    } else {
      direction = "down";
    }
    //紀錄每個人的資料，放在陣列當中
    peopleInfo.push({
      In: chooseFloor,
      Out: chooseFloorOut,
      direction: direction,
      status: "offTheElevator",
      elevatorResponse: "none",
      arrive: "none",
    });
    people--;
  }

  //判斷左邊電梯往上還是往下
  if (leftElevatorInfo.direction == "up" && leftElevatorInfo.currentFloor < 9) {
    leftElevatorInfo.currentFloor++;
    console.log("左邊電梯上樓");
  } else if (
    leftElevatorInfo.direction == "down" &&
    leftElevatorInfo.currentFloor > 0
  ) {
    leftElevatorInfo.currentFloor--;
    console.log("左邊電梯下樓");
  }

  //繪製左邊電梯移動後位置
  for (let i = 0; i < 10; i++) {
    if (i == leftElevatorInfo.currentFloor) {
      console.log(
        "左邊電梯，當前電梯位於 " + leftElevatorInfo.currentFloor + " 樓"
      );
      ctx.fillStyle = "white";
      ctx.strokeStyle = "red";
      ctx.fillRect(leftElevator[i].x, leftElevator[i].y, 120, 50);
      ctx.strokeRect(leftElevator[i].x, leftElevator[i].y, 120, 50);
      //繪製左邊電梯內人數;
      if (leftElevatorInfo.currentPeople == 1) {
        ctx.drawImage(
          onePerson,
          leftElevator[i].x + 40,
          leftElevator[i].y + 10,
          30,
          30
        );
      } else if (leftElevatorInfo.currentPeople == 2) {
        ctx.drawImage(
          twoPeople,
          leftElevator[i].x + 40,
          leftElevator[i].y + 10,
          30,
          30
        );
      } else if (leftElevatorInfo.currentPeople == 3) {
        ctx.drawImage(
          threePeople,
          leftElevator[i].x + 40,
          leftElevator[i].y + 10,
          30,
          30
        );
      } else if (leftElevatorInfo.currentPeople == 4) {
        ctx.drawImage(
          fourPeople,
          leftElevator[i].x + 40,
          leftElevator[i].y + 10,
          30,
          30
        );
      } else if (leftElevatorInfo.currentPeople == 5) {
        ctx.drawImage(
          fivePeople,
          leftElevator[i].x + 40,
          leftElevator[i].y + 10,
          30,
          30
        );
      }
    }
  }

  //移動完後，判斷是否有人要出電梯
  //出電梯後，資料從leftElevatorPassenger刪除，且peopleInfo.arrive設置為yes
  for (let i = 0; i < leftElevatorPassenger.length; i++) {
    //判斷乘客Out樓層是否與當前樓層一樣
    if (leftElevatorPassenger[i].Out == leftElevatorInfo.currentFloor) {
      //樓層一樣，將peopleInfo.arrive 設置為 arrived
      //且將在leftElevatorPassenger的資料刪除
      peopleInfo.arrive = "arrived";
      leftElevatorPassenger.splice(i, 1);
      i--; //因為砍掉一筆資料，所以讓i-1，而後迴圈中的i++會在檢測一次往前推送的資料
      leftElevatorInfo.currentPeople--;
      numberOfPeopleArrived++;
      console.log(
        "左邊電梯，有乘客離開，目前剩餘乘客數量為 : " +
          leftElevatorInfo.currentPeople
      );
      numberOfPassengerGetOutTheLeftElevator++;

      console.log("總共有 " + numberOfPeopleArrived + " 位乘客已離開");
      //如果電梯內所有乘客都離開
      if (leftElevatorInfo.currentPeople == 0) {
        leftElevatorInfo.basicTarget = "none";
        console.log("將leftElevatorInfo.basicTarget設置為none");
        leftElevatorInfo.direction = "none";
      }
    }
  }

  //當有人上面從for迴圈離開電梯，用來顯示離開人數的動畫
  if (numberOfPassengerGetOutTheLeftElevator != 0) {
    drawPassengerGetOutTheLeftElevator = setInterval(
      PassengerGetOutTheLeftElevator,
      500
    );
  }

  //新增乘客資料後，用FOR迴圈顯示哪些按鈕目前有被按下
  for (let i = 0; i < peopleInfo.length; i++) {
    if (peopleInfo[i].status == "offTheElevator") {
      if (peopleInfo[i].direction == "up") {
        ctx.fillStyle = "white";
        ctx.strokeStyle = "red";
        ctx.drawImage(
          imageUp,
          upButton[peopleInfo[i].In].x,
          upButton[peopleInfo[i].In].y,
          30,
          30
        );
        ctx.strokeRect(
          upButton[peopleInfo[i].In].x,
          upButton[peopleInfo[i].In].y,
          30,
          30
        );
      } else {
        ctx.fillStyle = "white";
        ctx.strokeStyle = "red";
        ctx.drawImage(
          imageDown,
          downButton[peopleInfo[i].In].x,
          downButton[peopleInfo[i].In].y,
          30,
          30
        );
        ctx.strokeRect(
          downButton[peopleInfo[i].In].x,
          downButton[peopleInfo[i].In].y,
          30,
          30
        );
      }
    }
  }

  //用for迴圈顯示電梯邊有多少人在等待
  let Floors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < peopleInfo.length; i++) {
    if (peopleInfo[i].status == "offTheElevator") {
      switch (peopleInfo[i].In) {
        case 0:
          Floors[0]++;
          break;
        case 1:
          Floors[1]++;
          break;
        case 2:
          Floors[2]++;
          break;
        case 3:
          Floors[3]++;
          break;
        case 4:
          Floors[4]++;
          break;
        case 5:
          Floors[5]++;
          break;
        case 6:
          Floors[6]++;
          break;
        case 7:
          Floors[7]++;
          break;
        case 8:
          Floors[8]++;
          break;
        case 9:
          Floors[9]++;
          break;
      }
    }
  }
  console.log("目前每個樓層等待人數 : " + Floors);

  for (let i = 0; i < Floors.length; i++) {
    if (Floors[i] == 1) {
      ctx.drawImage(onePerson, 40, 570 - i * 60, 30, 30);
    } else if (Floors[i] == 2) {
      ctx.drawImage(twoPeople, 40, 570 - i * 60, 30, 30);
    } else if (Floors[i] == 3) {
      ctx.drawImage(threePeople, 40, 570 - i * 60, 30, 30);
    } else if (Floors[i] == 4) {
      ctx.drawImage(fourPeople, 40, 570 - i * 60, 30, 30);
    } else if (Floors[i] == 5) {
      ctx.drawImage(fivePeople, 40, 570 - i * 60, 30, 30);
    } else if (Floors[i] == 6) {
      ctx.drawImage(sixpeople, 40, 570 - i * 60, 30, 30);
    } else if (Floors[i] == 7) {
      ctx.drawImage(sevenpeople, 40, 570 - i * 60, 30, 30);
    }
  }

  //目前有多少人尚未搭乘電梯
  let numberOfoffTheElevator = 0;
  for (let i = 0; i < peopleInfo.length; i++) {
    if (peopleInfo[i].status == "offTheElevator") {
      numberOfoffTheElevator++;
    }
  }
  console.log("目前有 " + numberOfoffTheElevator + " 人尚未搭乘電梯");

  //-------------------------------左邊電梯初始化設定---------------------------------------------
  //判斷目前是否有人在電梯內部且電梯有無basicTarget作為基準，如果兩個條件都無
  //在這裡設置好電梯行徑方向與當前最高或最低樓層
  //左邊電梯
  if (leftElevatorInfo.basicTarget == "none") {
    //目前電梯內沒有乘客，也沒有基準
    //從peopelInfo讀取一筆乘客資料status為offTheElevator，且elevatorResponse為none作為基準
    //將該筆資料的In當作endFloor
    //且判斷電梯運行方向
    for (let i = 0; i < peopleInfo.length; i++) {
      console.log("進入到設定左邊電梯初始迴圈");
      if (
        peopleInfo[i].status == "offTheElevator" &&
        peopleInfo[i].elevatorResponse == "none"
      ) {
        leftElevatorInfo.endFloor = peopleInfo[i].In;
        peopleInfo[i].elevatorResponse = "leftYes";
        console.log(
          "左邊電梯，將第 " + i + " 個乘客的elevatorResponse設定為leftYes"
        );
        leftElevatorInfo.basicTarget = "yes";
        console.log(
          "左邊電梯，找到basicTarget，設置為: " + leftElevatorInfo.basicTarget
        );
        if (leftElevatorInfo.currentFloor < peopleInfo[i].In) {
          leftElevatorInfo.direction = "up";
          if (peopleInfo[i].In < peopleInfo[i].Out) {
            leftElevatorInfo.futureDirection = "up";
          } else if (peopleInfo[i].In > peopleInfo[i].Out) {
            leftElevatorInfo.futureDirection = "down";
          }
          break;
        } else if (leftElevatorInfo.currentFloor > peopleInfo[i].In) {
          leftElevatorInfo.direction = "down";
          if (peopleInfo[i].In < peopleInfo[i].Out) {
            leftElevatorInfo.futureDirection = "up";
          } else if (peopleInfo[i].In > peopleInfo[i].Out) {
            leftElevatorInfo.futureDirection = "down";
          }
          break;
        }
        break;
      }
    }
    console.log("左邊電梯初始方向為: " + leftElevatorInfo.direction);
    console.log("左邊電梯接客樓層: " + leftElevatorInfo.endFloor);
  }
  //-------------------------------左邊電梯初始化設定結束------------------------------------------

  //-------------------------------左邊電梯乘載客人條件--------------------------------------------
  //判斷所有還未上電梯的乘客，是否有符合條件可以搭乘左邊電梯
  for (let i = 0; i < peopleInfo.length; i++) {
    if (peopleInfo[i].status == "offTheElevator") {
      console.log("左邊電梯檢測到有乘客狀態為offTheElevator");
      //狀態為offTheElevator，判斷電梯行徑方向是否與乘客相同
      //如果是作為基準值，direction可能會因為去上接乘客往下，或是下去接乘客往上而有所不同
      //所以elevatorResponse=yes的也可以搭乘
      if (
        leftElevatorInfo.futureDirection == peopleInfo[i].direction ||
        leftElevatorInfo.direction == peopleInfo[i].direction ||
        peopleInfo[i].elevatorResponse == "leftYes"
      ) {
        console.log(
          "檢測到有乘客搭乘方向與電梯一致，或是elevatorResponse為yes"
        );
        //相同路徑，或是elevatorResponse=yes
        //判斷乘客與電梯是否有在相同樓層
        if (leftElevatorInfo.currentFloor == peopleInfo[i].In) {
          console.log("檢測到有乘客與電梯樓層相同");

          //相同樓層
          //判斷電梯內人數是否少於5人
          if (leftElevatorInfo.currentPeople < 7) {
            console.log("檢測到電梯內部少於7人，可以搭乘");

            //搭乘人數少於5人
            //將資料推送到leftElevatorPassenger
            leftElevatorPassenger.push({
              In: peopleInfo[i].In,
              Out: peopleInfo[i].Out,
              direction: peopleInfo[i].direction,
            });
            peopleInfo[i].status = "onTheElevator";
            leftElevatorInfo.currentPeople++;
            console.log(
              "已有 " + leftElevatorInfo.currentPeople + " 位搭乘在左邊電梯內"
            );

            drawPassengerGetIntoTheLeftElevator = setInterval(
              PassengerGetIntoTheLeftElevator,
              500
            );
          }
        }
      }
    }
  }
  //-------------------------------左邊電梯乘載客人條件結束--------------------------------------------

  //--------------------------------左邊電梯更新資訊------------------------------
  //當左邊電梯內部有至少一人(>0)
  //先把電梯當前樓層與第一筆資料的Out最比較
  //判斷電梯該網上還是往下
  //判斷所有在電梯內的乘客最高或最低為幾樓
  if (leftElevatorInfo.currentPeople > 0) {
    //顯示乘客資訊------------------
    for (let i = 0; i < leftElevatorPassenger.length; i++) {
      console.log("左邊電梯，當前第 " + (i + 1) + "位乘客");
      console.log("左邊電梯，在 " + leftElevatorPassenger[i].In + "進入電梯");
      console.log("左邊電梯，在 " + leftElevatorPassenger[i].Out + "離開電梯");
      console.log("左邊電梯，行徑方向 " + leftElevatorPassenger[i].direction);
    }

    //------------------------------
    console.log(
      "左邊電梯，目前有 " + leftElevatorInfo.currentPeople + " 位乘客"
    );
    if (leftElevatorInfo.currentFloor < leftElevatorPassenger[0].Out) {
      leftElevatorInfo.direction = "up";
    } else if (leftElevatorInfo.currentFloor > leftElevatorPassenger[0].Out) {
      leftElevatorInfo.direction = "down";
    }
    console.log("左邊電梯方向調整後，方向為 : " + leftElevatorInfo.direction);

    leftElevatorInfo.endFloor = leftElevatorPassenger[0].Out; //將第一位的Out暫時設為最終樓層
    //如果人數大於1人，依照direction為上或下，來判斷最終樓層為多少
    if (
      leftElevatorInfo.direction == "up" &&
      leftElevatorInfo.currentPeople > 1
    ) {
      //電梯往上
      for (let i = 1; i < leftElevatorPassenger.length; i++) {
        if (leftElevatorInfo.endFloor < leftElevatorPassenger[i].Out) {
          leftElevatorInfo.endFloor = leftElevatorPassenger[i].Out;
        }
      }
    } else if (
      leftElevatorInfo.direction == "down" &&
      leftElevatorInfo.currentPeople > 1
    ) {
      for (let i = 1; i < leftElevatorPassenger.length; i++) {
        if (leftElevatorInfo.endFloor > leftElevatorPassenger[i].Out) {
          leftElevatorInfo.endFloor = leftElevatorPassenger[i].Out;
        }
      }
    }
    console.log("左邊電梯最終樓調整後，樓層為 : " + leftElevatorInfo.endFloor);
  }

  //--------------------------------左邊電梯更新資訊結束------------------------------

  //每次加一秒
  time++;
  //繪製所經過時間
  totalTime();
  console.log(
    "最終leftElevatorInfo.basicTarget為 : " + leftElevatorInfo.basicTarget
  );

  //如果numberOfPeopleArrived=40，代表所有人已離開電梯，結束動畫
  if (numberOfPeopleArrived == 40) {
    window.alert(
      "頂底層之間往返循環(按請求的頂底層)已完成，總耗時 : " + time + " 秒。"
    );

    clearInterval(elevatorStart);
  }

  console.log("====================================");
}

function PassengerGetIntoTheLeftElevator() {
  //繪製電梯旁乘客進入左邊電梯，讓電梯人數++

  if (leftElevatorInfo.currentPeople == 1) {
    // console.log("重新繪製電梯內人數，目前1人");

    ctx.drawImage(
      onePerson,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 2) {
    //console.log("重新繪製電梯內人數，目前2人");

    ctx.drawImage(
      twoPeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 3) {
    //console.log("重新繪製電梯內人數，目前3人");

    ctx.drawImage(
      threePeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 4) {
    //console.log("重新繪製電梯內人數，目前4人");

    ctx.drawImage(
      fourPeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 5) {
    //console.log("重新繪製電梯內人數，目前5人");

    ctx.drawImage(
      fivePeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 6) {
    //console.log("重新繪製電梯內人數，目前6人");

    ctx.drawImage(
      sixpeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 7) {
    //console.log("重新繪製電梯內人數，目前7人");

    ctx.drawImage(
      sevenpeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  }
  //繪製完電梯內乘客後，更新電梯外人數
  let Floors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < peopleInfo.length; i++) {
    if (peopleInfo[i].status == "offTheElevator") {
      switch (peopleInfo[i].In) {
        case 0:
          Floors[0]++;
          break;
        case 1:
          Floors[1]++;
          break;
        case 2:
          Floors[2]++;
          break;
        case 3:
          Floors[3]++;
          break;
        case 4:
          Floors[4]++;
          break;
        case 5:
          Floors[5]++;
          break;
        case 6:
          Floors[6]++;
          break;
        case 7:
          Floors[7]++;
          break;
        case 8:
          Floors[8]++;
          break;
        case 9:
          Floors[9]++;
          break;
      }
    }
  }

  for (let i = 0; i < Floors.length; i++) {
    if (Floors[i] == 0) {
      ctx.fillStyle = "lightcyan";
      ctx.fillRect(40, 570 - i * 60, 30, 30);
    } else if (Floors[i] == 1) {
      //console.log("重新繪製" + i + "樓電梯旁人數，剩餘人數 1 ..");

      ctx.drawImage(onePerson, 40, 570 - i * 60, 30, 30);
    } else if (Floors[i] == 2) {
      ctx.drawImage(twoPeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 2 ..");
    } else if (Floors[i] == 3) {
      ctx.drawImage(threePeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 3 ..");
    } else if (Floors[i] == 4) {
      ctx.drawImage(fourPeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 4 ..");
    } else if (Floors[i] == 5) {
      ctx.drawImage(fivePeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 5 ..");
    } else if (Floors[i] == 6) {
      ctx.drawImage(sixpeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 5 ..");
    } else if (Floors[i] == 7) {
      ctx.drawImage(sevenpeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 5 ..");
    }
  }
}

function PassengerGetOutTheLeftElevator() {
  //繪製剩餘在左邊電梯內人數;
  if (leftElevatorInfo.currentPeople == 0) {
    ctx.drawImage(
      zero,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 1) {
    ctx.drawImage(
      onePerson,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 2) {
    ctx.drawImage(
      twoPeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 3) {
    ctx.drawImage(
      threePeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 4) {
    ctx.drawImage(
      fourPeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 5) {
    ctx.drawImage(
      fivePeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 6) {
    ctx.drawImage(
      sixpeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 7) {
    ctx.drawImage(
      sevenpeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 40,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  }
  //  //繪製左邊電梯左邊顯示離開的人數

  if (numberOfPassengerGetOutTheLeftElevator == 1) {
    ctx.drawImage(
      onePerson,
      leftElevator[leftElevatorInfo.currentFloor].x + 140,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (numberOfPassengerGetOutTheLeftElevator == 2) {
    ctx.drawImage(
      twoPeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 140,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (numberOfPassengerGetOutTheLeftElevator == 3) {
    ctx.drawImage(
      threePeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 140,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (numberOfPassengerGetOutTheLeftElevator == 4) {
    ctx.drawImage(
      fourPeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 140,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (numberOfPassengerGetOutTheLeftElevator == 5) {
    ctx.drawImage(
      fivePeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 140,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (numberOfPassengerGetOutTheLeftElevator == 5) {
    ctx.drawImage(
      sixpeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 140,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (numberOfPassengerGetOutTheLeftElevator == 5) {
    ctx.drawImage(
      sevenpeople,
      leftElevator[leftElevatorInfo.currentFloor].x + 140,
      leftElevator[leftElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  }

  numberOfPassengerGetOutTheLeftElevator = 0;

  clearInterval(drawPassengerGetOutTheLeftElevator);
}

let elevatorStart = setInterval(draw, 1000);

let pause = false;
const partDcancelButton = document.getElementById("partDToggleButton");
partDcancelButton.addEventListener("click", () => {
  console.log("按下按鈕.......................");
  pause = !pause;
  if (pause == true) {
    console.log("暫停動畫");
    clearInterval(elevatorStart);
  } else if (pause == false) {
    console.log("繼續動畫");

    elevatorStart = setInterval(draw, 1000);
  }
});

//--------------------------------------------------------------------------------------------------------
//---------------------------------PART A 先進先出---------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

const PartACanvas = document.getElementById("myCanvasPartA");
const PartActx = PartACanvas.getContext("2d");
const PartAUnit = 20;
const PartARow = PartACanvas.height / PartAUnit;
const PartAColumn = PartACanvas.width / PartAUnit;

const PartActxLineWidth = 3;
PartActx.lineWidth = PartActxLineWidth;
PartActx.font = "16px Arial"; // 設置文字的字體和大小

let PartAPeople = 40;
let PartAPeopleInfo = [];
let PartANumberOfPeopleArrived = 0;
let PartATime = 0;
let PartAElevator = [];
let PartADrawPassengerGetIntoTheElevator;
let PartADrawPassengerGetOutTheElevator;

let PartANumberOfPassengerGetOutTheElevator = 0;

let PartAElevatorInfo = {
  direction: "",
  currentFloor: "0",
  endFloor: "0",
  currentPeople: "0",
  basicTarget: "none",
  futureDirection: "",
};

let PartAElevatorPassenger = [];

let PartAUpButton = [];
let PartADownButton = [];

function PartACreateElevator() {
  let yLocation = 560;
  for (let i = 0; i < 10; i++) {
    PartAElevator.push({ x: 120, y: yLocation });
    yLocation -= 60;
    PartActx.fillStyle = "white";
    PartActx.strokeStyle = "black";
    PartActx.fillRect(PartAElevator[i].x, PartAElevator[i].y, 120, 50);
    PartActx.strokeRect(PartAElevator[i].x, PartAElevator[i].y, 120, 50);
  }
}

function PartACreateUpButton() {
  let yLocation = 570;
  for (let i = 0; i < 10; i++) {
    PartAUpButton.push({ x: 310, y: yLocation });
    yLocation -= 60;
    PartActx.fillStyle = "white";
    PartActx.strokeStyle = "black";
    PartActx.drawImage(imageUp, PartAUpButton[i].x, PartAUpButton[i].y, 30, 30);
    PartActx.strokeRect(PartAUpButton[i].x, PartAUpButton[i].y, 30, 30);
  }
}
function PartACreateDownButton() {
  let yLocation = 570;
  for (let i = 0; i < 10; i++) {
    PartADownButton.push({ x: 350, y: yLocation });
    yLocation -= 60;
    PartActx.fillStyle = "white";
    PartActx.strokeStyle = "black";
    PartActx.drawImage(
      imageDown,
      PartADownButton[i].x,
      PartADownButton[i].y,
      30,
      30
    );

    PartActx.strokeRect(PartADownButton[i].x, PartADownButton[i].y, 30, 30);
  }
}
function PartADrawPeopleCount() {
  PartActx.fillStyle = "black"; // 設置文字的顏色
  PartActx.fillText("剩餘人數: " + PartAPeople, 300, 15); // 在指定位置繪製人數信息
}

function PartATotalTime() {
  PartActx.fillStyle = "black"; // 設置文字的顏色
  PartActx.fillText("目前所經過秒數: " + PartATime, 285, 620); // 在指定位置繪製人數信息
}

PartACreateElevator();
PartACreateUpButton();
PartACreateDownButton();
PartADrawPeopleCount();
PartATotalTime();
//繪製電梯目前位置
for (let i = 0; i < 10; i++) {
  console.log(
    "初始化，當前partA電梯在 " + PartAElevatorInfo.currentFloor + " 樓"
  );
  if (i == PartAElevatorInfo.currentFloor) {
    PartActx.fillStyle = "white";
    PartActx.strokeStyle = "red";
    PartActx.fillRect(PartAElevator[i].x, PartAElevator[i].y, 120, 50);
    PartActx.strokeRect(PartAElevator[i].x, PartAElevator[i].y, 120, 50);
  }
}

function PartADraw() {
  //重置
  PartActx.fillStyle = "lightcyan";
  PartActx.fillRect(0, 0, PartACanvas.width, PartACanvas.height);

  //繪製剩餘人數
  PartADrawPeopleCount();

  //繪製電梯
  for (let i = 0; i < 10; i++) {
    PartActx.fillStyle = "white";
    PartActx.strokeStyle = "black";
    PartActx.fillRect(PartAElevator[i].x, PartAElevator[i].y, 120, 50);
    PartActx.strokeRect(PartAElevator[i].x, PartAElevator[i].y, 120, 50);
    PartActx.drawImage(imageUp, PartAUpButton[i].x, PartAUpButton[i].y, 30, 30);
    PartActx.strokeRect(PartAUpButton[i].x, PartAUpButton[i].y, 30, 30);
    PartActx.drawImage(
      imageDown,
      PartADownButton[i].x,
      PartADownButton[i].y,
      30,
      30
    );
    PartActx.strokeRect(PartADownButton[i].x, PartADownButton[i].y, 30, 30);
  }

  //模擬人隨機按電梯按鈕
  if (PartAPeople > 0) {
    //隨機選擇出現樓層
    let chooseFloor = Math.floor(Math.random() * 10);

    //隨機選擇樓層出電梯
    let chooseFloorOut = Math.floor(Math.random() * 10);

    //先判斷時否有進出樓層是否有重覆，沒有的話，透過進出樓層判斷選擇電梯按鈕為上或下
    let direction;
    while (chooseFloorOut == chooseFloor) {
      //console.log("樓層重覆");
      chooseFloorOut = Math.floor(Math.random() * 10);
    }
    if (chooseFloorOut > chooseFloor) {
      direction = "up";
    } else {
      direction = "down";
    }
    //紀錄每個人的資料，放在陣列當中
    PartAPeopleInfo.push({
      In: chooseFloor,
      Out: chooseFloorOut,
      direction: direction,
      status: "offTheElevator",
      elevatorResponse: "none",
      arrive: "none",
    });
    PartAPeople--;
  }

  //判斷partA電梯往上還是往下
  if (
    PartAElevatorInfo.direction == "up" &&
    PartAElevatorInfo.currentFloor < 9
  ) {
    PartAElevatorInfo.currentFloor++;
    console.log("partA電梯上樓");
  } else if (
    PartAElevatorInfo.direction == "down" &&
    PartAElevatorInfo.currentFloor > 0
  ) {
    PartAElevatorInfo.currentFloor--;
    console.log("partA電梯下樓");
  }

  //繪製電梯移動後位置
  for (let i = 0; i < 10; i++) {
    if (i == PartAElevatorInfo.currentFloor) {
      console.log(
        "partA電梯，當前位於 " + PartAElevatorInfo.currentFloor + " 樓"
      );
      PartActx.fillStyle = "white";
      PartActx.strokeStyle = "red";
      PartActx.fillRect(PartAElevator[i].x, PartAElevator[i].y, 120, 50);
      PartActx.strokeRect(PartAElevator[i].x, PartAElevator[i].y, 120, 50);
      //繪製電梯內人數;
      if (PartAElevatorInfo.currentPeople == 1) {
        PartActx.drawImage(
          onePerson,
          PartAElevator[i].x + 40,
          PartAElevator[i].y + 10,
          30,
          30
        );
      } else if (PartAElevatorInfo.currentPeople == 2) {
        PartActx.drawImage(
          twoPeople,
          PartAElevator[i].x + 40,
          PartAElevator[i].y + 10,
          30,
          30
        );
      } else if (PartAElevatorInfo.currentPeople == 3) {
        PartActx.drawImage(
          threePeople,
          PartAElevator[i].x + 40,
          PartAElevator[i].y + 10,
          30,
          30
        );
      } else if (PartAElevatorInfo.currentPeople == 4) {
        PartActx.drawImage(
          fourPeople,
          PartAElevator[i].x + 40,
          PartAElevator[i].y + 10,
          30,
          30
        );
      } else if (PartAElevatorInfo.currentPeople == 5) {
        PartActx.drawImage(
          fivePeople,
          PartAElevator[i].x + 40,
          PartAElevator[i].y + 10,
          30,
          30
        );
      }
    }
  }

  //移動完後，判斷是否有人要出電梯
  //出電梯後，資料從PartAElevatorPassenger刪除，且PartAPeopleInfo.arrive設置為yes
  for (let i = 0; i < PartAElevatorPassenger.length; i++) {
    //判斷乘客Out樓層是否與當前樓層一樣
    if (PartAElevatorPassenger[i].Out == PartAElevatorInfo.currentFloor) {
      //樓層一樣，將peopleInfo.arrive 設置為 arrived
      //且將在leftElevatorPassenger的資料刪除
      PartAPeopleInfo.arrive = "arrived";
      PartAElevatorPassenger.splice(i, 1);
      i--; //因為砍掉一筆資料，所以讓i-1，而後迴圈中的i++會在檢測一次往前推送的資料
      PartAElevatorInfo.currentPeople--;
      PartANumberOfPeopleArrived++;
      console.log(
        "partA電梯，有乘客離開，目前剩餘乘客數量為 : " +
          PartAElevatorInfo.currentPeople
      );
      PartANumberOfPassengerGetOutTheElevator++;

      console.log("總共有 " + PartANumberOfPeopleArrived + " 位乘客已離開");
      //如果電梯內所有乘客都離開
      if (PartAElevatorInfo.currentPeople == 0) {
        PartAElevatorInfo.basicTarget = "none";
        console.log("將partA ElevatorInfo.basicTarget設置為none");
        PartAElevatorInfo.direction = "none";
      }
    }
  }

  //當有人上面從for迴圈離開電梯，用來顯示離開人數的動畫
  if (PartANumberOfPassengerGetOutTheElevator != 0) {
    PartADrawPassengerGetOutTheElevator = setInterval(
      partAPassengerGetOutTheElevator,
      500
    );
  }

  //新增乘客資料後，用FOR迴圈顯示哪些按鈕目前有被按下
  for (let i = 0; i < PartAPeopleInfo.length; i++) {
    if (PartAPeopleInfo[i].status == "offTheElevator") {
      if (PartAPeopleInfo[i].direction == "up") {
        PartActx.fillStyle = "white";
        PartActx.strokeStyle = "red";
        PartActx.drawImage(
          imageUp,
          PartAUpButton[PartAPeopleInfo[i].In].x,
          PartAUpButton[PartAPeopleInfo[i].In].y,
          30,
          30
        );
        PartActx.strokeRect(
          PartAUpButton[PartAPeopleInfo[i].In].x,
          PartAUpButton[PartAPeopleInfo[i].In].y,
          30,
          30
        );
      } else {
        PartActx.fillStyle = "white";
        PartActx.strokeStyle = "red";
        PartActx.drawImage(
          imageDown,
          PartADownButton[PartAPeopleInfo[i].In].x,
          PartADownButton[PartAPeopleInfo[i].In].y,
          30,
          30
        );
        PartActx.strokeRect(
          PartADownButton[PartAPeopleInfo[i].In].x,
          PartADownButton[PartAPeopleInfo[i].In].y,
          30,
          30
        );
      }
    }
  }

  //用for迴圈顯示電梯邊有多少人在等待
  let PartAFloors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < PartAPeopleInfo.length; i++) {
    if (PartAPeopleInfo[i].status == "offTheElevator") {
      switch (PartAPeopleInfo[i].In) {
        case 0:
          PartAFloors[0]++;
          break;
        case 1:
          PartAFloors[1]++;
          break;
        case 2:
          PartAFloors[2]++;
          break;
        case 3:
          PartAFloors[3]++;
          break;
        case 4:
          PartAFloors[4]++;
          break;
        case 5:
          PartAFloors[5]++;
          break;
        case 6:
          PartAFloors[6]++;
          break;
        case 7:
          PartAFloors[7]++;
          break;
        case 8:
          PartAFloors[8]++;
          break;
        case 9:
          PartAFloors[9]++;
          break;
      }
    }
  }
  console.log("partA電梯目前每個樓層等待人數 : " + PartAFloors);

  for (let i = 0; i < PartAFloors.length; i++) {
    if (PartAFloors[i] == 1) {
      PartActx.drawImage(onePerson, 40, 570 - i * 60, 30, 30);
    } else if (PartAFloors[i] == 2) {
      PartActx.drawImage(twoPeople, 40, 570 - i * 60, 30, 30);
    } else if (PartAFloors[i] == 3) {
      PartActx.drawImage(threePeople, 40, 570 - i * 60, 30, 30);
    } else if (PartAFloors[i] == 4) {
      PartActx.drawImage(fourPeople, 40, 570 - i * 60, 30, 30);
    } else if (PartAFloors[i] == 5) {
      PartActx.drawImage(fivePeople, 40, 570 - i * 60, 30, 30);
    }
  }

  //目前有多少人尚未搭乘電梯
  let partANumberOfoffTheElevator = 0;
  for (let i = 0; i < PartAPeopleInfo.length; i++) {
    if (PartAPeopleInfo[i].status == "offTheElevator") {
      partANumberOfoffTheElevator++;
    }
  }
  console.log(
    "partA電梯，目前有 " + partANumberOfoffTheElevator + " 人尚未搭乘電梯"
  );

  //-------------------------------partA電梯初始化設定---------------------------------------------
  //判斷目前是否有人在電梯內部且電梯有無basicTarget作為基準，如果兩個條件都無
  //在這裡設置好電梯行徑方向與當前最高或最低樓層
  //左邊電梯
  if (PartAElevatorInfo.basicTarget == "none") {
    //目前電梯內沒有乘客，也沒有基準
    //從peopelInfo讀取一筆乘客資料status為offTheElevator，且elevatorResponse為none作為基準
    //將該筆資料的In當作endFloor
    //且判斷電梯運行方向
    for (let i = 0; i < PartAPeopleInfo.length; i++) {
      console.log("進入到設定partA電梯初始迴圈");
      if (
        PartAPeopleInfo[i].status == "offTheElevator" &&
        PartAPeopleInfo[i].elevatorResponse == "none"
      ) {
        PartAElevatorInfo.endFloor = PartAPeopleInfo[i].In;
        PartAPeopleInfo[i].elevatorResponse = "Yes";
        console.log(
          "partA電梯，將第 " + i + " 個乘客的elevatorResponse設定為Yes"
        );
        PartAElevatorInfo.basicTarget = "yes";
        console.log(
          "partA電梯，找到basicTarget，設置為: " + PartAElevatorInfo.basicTarget
        );
        if (PartAElevatorInfo.currentFloor < PartAPeopleInfo[i].In) {
          PartAElevatorInfo.direction = "up";
          if (PartAPeopleInfo[i].In < PartAPeopleInfo[i].Out) {
            PartAElevatorInfo.futureDirection = "up";
          } else if (PartAPeopleInfo[i].In > PartAPeopleInfo[i].Out) {
            PartAElevatorInfo.futureDirection = "down";
          }
          break;
        } else if (PartAElevatorInfo.currentFloor > PartAPeopleInfo[i].In) {
          PartAElevatorInfo.direction = "down";
          if (PartAPeopleInfo[i].In < PartAPeopleInfo[i].Out) {
            PartAElevatorInfo.futureDirection = "up";
          } else if (PartAPeopleInfo[i].In > PartAPeopleInfo[i].Out) {
            PartAElevatorInfo.futureDirection = "down";
          }
          break;
        }
        break;
      }
    }
    console.log("partA電梯初始方向為: " + PartAElevatorInfo.direction);
    console.log("partA電梯接客樓層: " + PartAElevatorInfo.endFloor);
  }
  //-------------------------------partA電梯初始化設定結束------------------------------------------

  //-------------------------------partA電梯乘載客人條件--------------------------------------------
  //判斷所有還未上電梯的乘客，是否有符合條件可以搭乘partA電梯
  for (let i = 0; i < PartAPeopleInfo.length; i++) {
    if (PartAPeopleInfo[i].status == "offTheElevator") {
      console.log("partA電梯檢測到有乘客狀態為offTheElevator");
      //狀態為offTheElevator，判斷電梯行徑方向是否與乘客相同
      //如果是作為基準值，direction可能會因為去上接乘客往下，或是下去接乘客往上而有所不同
      //所以elevatorResponse=yes的也可以搭乘
      if (PartAPeopleInfo[i].elevatorResponse == "Yes") {
        console.log("檢測到有乘客elevatorResponse為yes");
        //相同路徑，或是elevatorResponse=yes
        //判斷乘客與電梯是否有在相同樓層
        if (PartAElevatorInfo.currentFloor == PartAPeopleInfo[i].In) {
          console.log("檢測到有乘客與電梯樓層相同");

          //相同樓層
          //判斷電梯內人數是否少於5人
          if (PartAElevatorInfo.currentPeople < 7) {
            console.log("檢測到電梯內部少於7人，可以搭乘");

            //搭乘人數少於5人
            //將資料推送到leftElevatorPassenger

            PartAElevatorPassenger.push({
              In: PartAPeopleInfo[i].In,
              Out: PartAPeopleInfo[i].Out,
              direction: PartAPeopleInfo[i].direction,
            });
            PartAPeopleInfo[i].status = "onTheElevator";
            PartAElevatorInfo.currentPeople++;
            console.log(
              "已有 " + PartAElevatorInfo.currentPeople + " 位搭乘在左邊電梯內"
            );

            PartADrawPassengerGetIntoTheElevator = setInterval(
              partAPassengerGetIntoTheElevator,
              500
            );
          }
        }
      }
    }
  }
  //-------------------------------partA電梯乘載客人條件結束--------------------------------------------

  //--------------------------------partA電梯更新資訊------------------------------
  //當partA電梯內部有至少一人(>0)
  //先把電梯當前樓層與第一筆資料的Out最比較
  //判斷電梯該網上還是往下
  //判斷所有在電梯內的乘客最高或最低為幾樓

  if (PartAElevatorInfo.currentPeople > 0) {
    //顯示乘客資訊------------------
    for (let i = 0; i < PartAElevatorPassenger.length; i++) {
      console.log("左邊電梯，當前第 " + (i + 1) + "位乘客");
      console.log("左邊電梯，在 " + PartAElevatorPassenger[i].In + "進入電梯");
      console.log("左邊電梯，在 " + PartAElevatorPassenger[i].Out + "離開電梯");
      console.log("左邊電梯，行徑方向 " + PartAElevatorPassenger[i].direction);
    }

    //------------------------------
    console.log(
      "左邊電梯，目前有 " + PartAElevatorInfo.currentPeople + " 位乘客"
    );
    if (PartAElevatorInfo.currentFloor < PartAElevatorPassenger[0].Out) {
      PartAElevatorInfo.direction = "up";
    } else if (PartAElevatorInfo.currentFloor > PartAElevatorPassenger[0].Out) {
      PartAElevatorInfo.direction = "down";
    }

    console.log(
      "partA電梯最終樓調整後，樓層為 : " + PartAElevatorInfo.endFloor
    );
  }

  //每次加一秒

  PartATime++;
  //繪製所經過時間
  PartATotalTime();
  console.log(
    "最終PartAElevatorInfo.basicTarget為 : " + PartAElevatorInfo.basicTarget
  );

  //如果numberOfPeopleArrived=40，代表所有人已離開電梯，結束動畫
  if (PartANumberOfPeopleArrived == 40) {
    window.alert("先到先得已完成，總耗時 : " + PartATime + " 秒。");

    clearInterval(PartAElevatorStart);
  }

  console.log("====================================");

  //--------------------------------partA電梯更新資訊結束------------------------------
}

function partAPassengerGetIntoTheElevator() {
  //繪製電梯旁乘客進入左邊電梯，讓電梯人數++

  if (PartAElevatorInfo.currentPeople == 1) {
    // console.log("重新繪製電梯內人數，目前1人");

    PartActx.drawImage(
      onePerson,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 40,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (leftElevatorInfo.currentPeople == 2) {
    //console.log("重新繪製電梯內人數，目前2人");

    PartActx.drawImage(
      twoPeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 40,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartAElevatorInfo.currentPeople == 3) {
    //console.log("重新繪製電梯內人數，目前3人");

    PartActx.drawImage(
      threePeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 40,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartAElevatorInfo.currentPeople == 4) {
    //console.log("重新繪製電梯內人數，目前4人");

    PartActx.drawImage(
      fourPeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 40,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartAElevatorInfo.currentPeople == 5) {
    //console.log("重新繪製電梯內人數，目前5人");

    PartActx.drawImage(
      fivePeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 40,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartAElevatorInfo.currentPeople == 6) {
    //console.log("重新繪製電梯內人數，目前6人");

    PartActx.drawImage(
      sixpeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 40,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartAElevatorInfo.currentPeople == 7) {
    //console.log("重新繪製電梯內人數，目前7人");

    PartActx.drawImage(
      sevenpeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 40,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  }
  //繪製完電梯內乘客後，更新電梯外人數
  let PartAFloors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < PartAPeopleInfo.length; i++) {
    if (PartAPeopleInfo[i].status == "offTheElevator") {
      switch (PartAPeopleInfo[i].In) {
        case 0:
          PartAFloors[0]++;
          break;
        case 1:
          PartAFloors[1]++;
          break;
        case 2:
          PartAFloors[2]++;
          break;
        case 3:
          PartAFloors[3]++;
          break;
        case 4:
          PartAFloors[4]++;
          break;
        case 5:
          PartAFloors[5]++;
          break;
        case 6:
          PartAFloors[6]++;
          break;
        case 7:
          PartAFloors[7]++;
          break;
        case 8:
          PartAFloors[8]++;
          break;
        case 9:
          PartAFloors[9]++;
          break;
      }
    }
  }

  for (let i = 0; i < PartAFloors.length; i++) {
    if (PartAFloors[i] == 0) {
      PartActx.fillStyle = "lightcyan";
      PartActx.fillRect(40, 570 - i * 60, 30, 30);
    } else if (PartAFloors[i] == 1) {
      //console.log("重新繪製" + i + "樓電梯旁人數，剩餘人數 1 ..");

      PartActx.drawImage(onePerson, 40, 570 - i * 60, 30, 30);
    } else if (PartAFloors[i] == 2) {
      PartActx.drawImage(twoPeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 2 ..");
    } else if (PartAFloors[i] == 3) {
      PartActx.drawImage(threePeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 3 ..");
    } else if (PartAFloors[i] == 4) {
      PartActx.drawImage(fourPeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 4 ..");
    } else if (PartAFloors[i] == 5) {
      PartActx.drawImage(fivePeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 5 ..");
    }
  }
}

function partAPassengerGetOutTheElevator() {
  //繪製剩餘在左邊電梯內人數;
  if (PartAElevatorInfo.currentPeople == 0) {
    PartActx.drawImage(
      zero,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 40,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartAElevatorInfo.currentPeople == 1) {
    PartActx.drawImage(
      onePerson,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 40,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartAElevatorInfo.currentPeople == 2) {
    PartActx.drawImage(
      twoPeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 40,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartAElevatorInfo.currentPeople == 3) {
    PartActx.drawImage(
      threePeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 40,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartAElevatorInfo.currentPeople == 4) {
    PartActx.drawImage(
      fourPeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 40,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartAElevatorInfo.currentPeople == 5) {
    PartActx.drawImage(
      fivePeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 40,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  }
  //  //繪製partA電梯左邊顯示離開的人數

  if (PartANumberOfPassengerGetOutTheElevator == 1) {
    PartActx.drawImage(
      onePerson,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 140,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartANumberOfPassengerGetOutTheElevator == 2) {
    PartActx.drawImage(
      twoPeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 140,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartANumberOfPassengerGetOutTheElevator == 3) {
    PartActx.drawImage(
      threePeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 140,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartANumberOfPassengerGetOutTheElevator == 4) {
    PartActx.drawImage(
      fourPeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 140,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartANumberOfPassengerGetOutTheElevator == 5) {
    PartActx.drawImage(
      fivePeople,
      PartAElevator[PartAElevatorInfo.currentFloor].x + 140,
      PartAElevator[PartAElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  }
  PartANumberOfPassengerGetOutTheElevator = 0;

  clearInterval(PartADrawPassengerGetOutTheElevator);
}

let PartAElevatorStart = setInterval(PartADraw, 1000);

let partAPause = false;
const cancelButton = document.getElementById("partAToggleButton");
cancelButton.addEventListener("click", () => {
  console.log("按下按鈕.......................");
  partAPause = !partAPause;
  if (partAPause == true) {
    console.log("暫停動畫");
    clearInterval(PartAElevatorStart);
  } else if (partAPause == false) {
    console.log("繼續動畫");

    PartAElevatorStart = setInterval(PartADraw, 1000);
  }
});

//--------------------------------------------------------------------------------------------------------
//---------------------------------PART A 先進先出結束---------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//---------------------------------PART C 頂底層之間往返循環---------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

const PartCCanvas = document.getElementById("myCanvasPartC");
const PartCctx = PartCCanvas.getContext("2d");
const PartCUnit = 20;
const PartCRow = PartCCanvas.height / PartCUnit;
const PartCColumn = PartCCanvas.width / PartCUnit;

const PartCctxLineWidth = 3;
PartCctx.lineWidth = PartCctxLineWidth;
PartCctx.font = "16px Arial"; // 設置文字的字體和大小

let PartCPeople = 40;
let PartCPeopleInfo = [];
let PartCNumberOfPeopleArrived = 0;
let PartCTime = 0;
let PartCElevator = [];
let PartCDrawPassengerGetIntoTheElevator;
let PartCDrawPassengerGetOutTheElevator;

let PartCNumberOfPassengerGetOutTheElevator = 0;

let PartCElevatorInfo = {
  direction: "",
  currentFloor: "0",
  endFloor: "0",
  currentPeople: "0",
  basicTarget: "none",
  futureDirection: "",
};

let PartCElevatorPassenger = [];

let PartCUpButton = [];
let PartCDownButton = [];

function PartCCreateElevator() {
  let yLocation = 560;
  for (let i = 0; i < 10; i++) {
    PartCElevator.push({ x: 120, y: yLocation });
    yLocation -= 60;
    PartCctx.fillStyle = "white";
    PartCctx.strokeStyle = "black";
    PartCctx.fillRect(PartCElevator[i].x, PartCElevator[i].y, 120, 50);
    PartCctx.strokeRect(PartCElevator[i].x, PartCElevator[i].y, 120, 50);
  }
}

function PartCCreateUpButton() {
  let yLocation = 570;
  for (let i = 0; i < 10; i++) {
    PartCUpButton.push({ x: 310, y: yLocation });
    yLocation -= 60;
    PartCctx.fillStyle = "white";
    PartCctx.strokeStyle = "black";
    PartCctx.drawImage(imageUp, PartCUpButton[i].x, PartCUpButton[i].y, 30, 30);
    PartCctx.strokeRect(PartCUpButton[i].x, PartCUpButton[i].y, 30, 30);
  }
}
function PartCCreateDownButton() {
  let yLocation = 570;
  for (let i = 0; i < 10; i++) {
    PartCDownButton.push({ x: 350, y: yLocation });
    yLocation -= 60;
    PartCctx.fillStyle = "white";
    PartCctx.strokeStyle = "black";
    PartCctx.drawImage(
      imageDown,
      PartCDownButton[i].x,
      PartCDownButton[i].y,
      30,
      30
    );

    PartCctx.strokeRect(PartCDownButton[i].x, PartCDownButton[i].y, 30, 30);
  }
}
function PartCDrawPeopleCount() {
  PartCctx.fillStyle = "black"; // 設置文字的顏色
  PartCctx.fillText("剩餘人數: " + PartCPeople, 300, 15); // 在指定位置繪製人數信息
}

function PartCTotalTime() {
  PartCctx.fillStyle = "black"; // 設置文字的顏色
  PartCctx.fillText("目前所經過秒數: " + PartCTime, 285, 620); // 在指定位置繪製人數信息
}

PartCCreateElevator();
PartCCreateUpButton();
PartCCreateDownButton();
PartCDrawPeopleCount();
PartCTotalTime();
//繪製電梯目前位置
for (let i = 0; i < 10; i++) {
  console.log(
    "初始化，當前partC電梯在 " + PartCElevatorInfo.currentFloor + " 樓"
  );
  if (i == PartCElevatorInfo.currentFloor) {
    PartCctx.fillStyle = "white";
    PartCctx.strokeStyle = "red";
    PartCctx.fillRect(PartCElevator[i].x, PartCElevator[i].y, 120, 50);
    PartCctx.strokeRect(PartCElevator[i].x, PartCElevator[i].y, 120, 50);
  }
}

function PartCDraw() {
  //重置
  PartCctx.fillStyle = "lightcyan";
  PartCctx.fillRect(0, 0, PartCCanvas.width, PartCCanvas.height);

  //繪製剩餘人數
  PartCDrawPeopleCount();

  //繪製電梯
  for (let i = 0; i < 10; i++) {
    PartCctx.fillStyle = "white";
    PartCctx.strokeStyle = "black";
    PartCctx.fillRect(PartCElevator[i].x, PartCElevator[i].y, 120, 50);
    PartCctx.strokeRect(PartCElevator[i].x, PartCElevator[i].y, 120, 50);
    PartCctx.drawImage(imageUp, PartCUpButton[i].x, PartCUpButton[i].y, 30, 30);
    PartCctx.strokeRect(PartCUpButton[i].x, PartCUpButton[i].y, 30, 30);
    PartCctx.drawImage(
      imageDown,
      PartCDownButton[i].x,
      PartCDownButton[i].y,
      30,
      30
    );
    PartCctx.strokeRect(PartCDownButton[i].x, PartCDownButton[i].y, 30, 30);
  }

  //模擬人隨機按電梯按鈕
  if (PartCPeople > 0) {
    //隨機選擇出現樓層
    let chooseFloor = Math.floor(Math.random() * 10);

    //隨機選擇樓層出電梯
    let chooseFloorOut = Math.floor(Math.random() * 10);

    //先判斷時否有進出樓層是否有重覆，沒有的話，透過進出樓層判斷選擇電梯按鈕為上或下
    let direction;
    while (chooseFloorOut == chooseFloor) {
      //console.log("樓層重覆");
      chooseFloorOut = Math.floor(Math.random() * 10);
    }
    if (chooseFloorOut > chooseFloor) {
      direction = "up";
    } else {
      direction = "down";
    }
    //紀錄每個人的資料，放在陣列當中
    PartCPeopleInfo.push({
      In: chooseFloor,
      Out: chooseFloorOut,
      direction: direction,
      status: "offTheElevator",
      elevatorResponse: "none",
      arrive: "none",
    });
    PartCPeople--;
  }

  //判斷partC電梯往上還是往下
  if (
    PartCElevatorInfo.direction == "up" &&
    PartCElevatorInfo.currentFloor < 9
  ) {
    PartCElevatorInfo.currentFloor++;
    console.log("partC電梯上樓");
  } else if (
    PartCElevatorInfo.direction == "down" &&
    PartCElevatorInfo.currentFloor > 0
  ) {
    PartCElevatorInfo.currentFloor--;
    console.log("partC電梯下樓");
  }

  //繪製電梯移動後位置
  for (let i = 0; i < 10; i++) {
    if (i == PartCElevatorInfo.currentFloor) {
      console.log(
        "partC電梯，當前位於 " + PartCElevatorInfo.currentFloor + " 樓"
      );
      PartCctx.fillStyle = "white";
      PartCctx.strokeStyle = "red";
      PartCctx.fillRect(PartCElevator[i].x, PartCElevator[i].y, 120, 50);
      PartCctx.strokeRect(PartCElevator[i].x, PartCElevator[i].y, 120, 50);
      //繪製電梯內人數;
      if (PartCElevatorInfo.currentPeople == 1) {
        PartCctx.drawImage(
          onePerson,
          PartCElevator[i].x + 40,
          PartCElevator[i].y + 10,
          30,
          30
        );
      } else if (PartCElevatorInfo.currentPeople == 2) {
        PartCctx.drawImage(
          twoPeople,
          PartCElevator[i].x + 40,
          PartCElevator[i].y + 10,
          30,
          30
        );
      } else if (PartCElevatorInfo.currentPeople == 3) {
        PartCctx.drawImage(
          threePeople,
          PartCElevator[i].x + 40,
          PartCElevator[i].y + 10,
          30,
          30
        );
      } else if (PartCElevatorInfo.currentPeople == 4) {
        PartCctx.drawImage(
          fourPeople,
          PartCElevator[i].x + 40,
          PartCElevator[i].y + 10,
          30,
          30
        );
      } else if (PartCElevatorInfo.currentPeople == 5) {
        PartCctx.drawImage(
          fivePeople,
          PartCElevator[i].x + 40,
          PartCElevator[i].y + 10,
          30,
          30
        );
      }
    }
  }

  //移動完後，判斷是否有人要出電梯
  //出電梯後，資料從PartCElevatorPassenger刪除，且PartCPeopleInfo.arrive設置為yes
  for (let i = 0; i < PartCElevatorPassenger.length; i++) {
    //判斷乘客Out樓層是否與當前樓層一樣
    if (PartCElevatorPassenger[i].Out == PartCElevatorInfo.currentFloor) {
      //樓層一樣，將peopleInfo.arrive 設置為 arrived
      //且將在leftElevatorPassenger的資料刪除
      PartCPeopleInfo.arrive = "arrived";
      PartCElevatorPassenger.splice(i, 1);
      i--; //因為砍掉一筆資料，所以讓i-1，而後迴圈中的i++會在檢測一次往前推送的資料
      PartCElevatorInfo.currentPeople--;
      PartCNumberOfPeopleArrived++;
      console.log(
        "partC電梯，有乘客離開，目前剩餘乘客數量為 : " +
          PartCElevatorInfo.currentPeople
      );
      PartCNumberOfPassengerGetOutTheElevator++;

      console.log("總共有 " + PartCNumberOfPeopleArrived + " 位乘客已離開");
    }
  }

  //當有人上面從for迴圈離開電梯，用來顯示離開人數的動畫
  if (PartCNumberOfPassengerGetOutTheElevator != 0) {
    PartCDrawPassengerGetOutTheElevator = setInterval(
      partCPassengerGetOutTheElevator,
      500
    );
  }

  //新增乘客資料後，用FOR迴圈顯示哪些按鈕目前有被按下
  for (let i = 0; i < PartCPeopleInfo.length; i++) {
    if (PartCPeopleInfo[i].status == "offTheElevator") {
      if (PartCPeopleInfo[i].direction == "up") {
        PartCctx.fillStyle = "white";
        PartCctx.strokeStyle = "red";
        PartCctx.drawImage(
          imageUp,
          PartCUpButton[PartCPeopleInfo[i].In].x,
          PartCUpButton[PartCPeopleInfo[i].In].y,
          30,
          30
        );
        PartCctx.strokeRect(
          PartCUpButton[PartCPeopleInfo[i].In].x,
          PartCUpButton[PartCPeopleInfo[i].In].y,
          30,
          30
        );
      } else {
        PartCctx.fillStyle = "white";
        PartCctx.strokeStyle = "red";
        PartCctx.drawImage(
          imageDown,
          PartCDownButton[PartCPeopleInfo[i].In].x,
          PartCDownButton[PartCPeopleInfo[i].In].y,
          30,
          30
        );
        PartCctx.strokeRect(
          PartCDownButton[PartCPeopleInfo[i].In].x,
          PartCDownButton[PartCPeopleInfo[i].In].y,
          30,
          30
        );
      }
    }
  }

  //用for迴圈顯示電梯邊有多少人在等待
  let PartCFloors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < PartCPeopleInfo.length; i++) {
    if (PartCPeopleInfo[i].status == "offTheElevator") {
      switch (PartCPeopleInfo[i].In) {
        case 0:
          PartCFloors[0]++;
          break;
        case 1:
          PartCFloors[1]++;
          break;
        case 2:
          PartCFloors[2]++;
          break;
        case 3:
          PartCFloors[3]++;
          break;
        case 4:
          PartCFloors[4]++;
          break;
        case 5:
          PartCFloors[5]++;
          break;
        case 6:
          PartCFloors[6]++;
          break;
        case 7:
          PartCFloors[7]++;
          break;
        case 8:
          PartCFloors[8]++;
          break;
        case 9:
          PartCFloors[9]++;
          break;
      }
    }
  }
  console.log("partC電梯目前每個樓層等待人數 : " + PartCFloors);

  for (let i = 0; i < PartCFloors.length; i++) {
    if (PartCFloors[i] == 1) {
      PartCctx.drawImage(onePerson, 40, 570 - i * 60, 30, 30);
    } else if (PartCFloors[i] == 2) {
      PartCctx.drawImage(twoPeople, 40, 570 - i * 60, 30, 30);
    } else if (PartCFloors[i] == 3) {
      PartCctx.drawImage(threePeople, 40, 570 - i * 60, 30, 30);
    } else if (PartCFloors[i] == 4) {
      PartCctx.drawImage(fourPeople, 40, 570 - i * 60, 30, 30);
    } else if (PartCFloors[i] == 5) {
      PartCctx.drawImage(fivePeople, 40, 570 - i * 60, 30, 30);
    } else if (PartCFloors[i] == 6) {
      PartCctx.drawImage(sixpeople, 40, 570 - i * 60, 30, 30);
    } else if (PartCFloors[i] == 7) {
      PartCctx.drawImage(sevenpeople, 40, 570 - i * 60, 30, 30);
    }
  }

  //目前有多少人尚未搭乘電梯
  let partCNumberOfoffTheElevator = 0;
  for (let i = 0; i < PartCPeopleInfo.length; i++) {
    if (PartCPeopleInfo[i].status == "offTheElevator") {
      partCNumberOfoffTheElevator++;
    }
  }
  console.log(
    "partC電梯，目前有 " + partCNumberOfoffTheElevator + " 人尚未搭乘電梯"
  );

  //------------------------------partC電梯往頂層底層循環-------------------------------------------
  if (PartCElevatorInfo.currentFloor == 0 && PartCNumberOfPeopleArrived != 40) {
    PartCElevatorInfo.direction = "up";
  } else if (
    PartCElevatorInfo.currentFloor == 9 &&
    PartCNumberOfPeopleArrived != 40
  ) {
    PartCElevatorInfo.direction = "down";
  }

  //-------------------------------partC電梯乘載客人條件--------------------------------------------
  //判斷所有還未上電梯的乘客，是否有符合條件可以搭乘partC電梯
  for (let i = 0; i < PartCPeopleInfo.length; i++) {
    if (PartCPeopleInfo[i].status == "offTheElevator") {
      console.log("partC電梯檢測到有乘客狀態為offTheElevator");
      //狀態為offTheElevator，判斷電梯行徑方向是否與乘客相同
      //如果是作為基準值，direction可能會因為去上接乘客往下，或是下去接乘客往上而有所不同
      //所以elevatorResponse=yes的也可以搭乘

      if (PartCElevatorInfo.currentFloor == PartCPeopleInfo[i].In) {
        console.log("檢測到有乘客與電梯樓層相同");

        //相同樓層
        //判斷電梯內人數是否少於5人
        if (PartCElevatorInfo.currentPeople < 7) {
          console.log("檢測到電梯內部少於7人，可以搭乘");

          //搭乘人數少於5人
          //將資料推送到leftElevatorPassenger

          PartCElevatorPassenger.push({
            In: PartCPeopleInfo[i].In,
            Out: PartCPeopleInfo[i].Out,
            direction: PartCPeopleInfo[i].direction,
          });
          PartCPeopleInfo[i].status = "onTheElevator";
          PartCElevatorInfo.currentPeople++;
          console.log(
            "已有 " + PartCElevatorInfo.currentPeople + " 位搭乘在左邊電梯內"
          );

          PartCDrawPassengerGetIntoTheElevator = setInterval(
            partCPassengerGetIntoTheElevator,
            500
          );
        }
      }
    }
  }
  //-------------------------------partC電梯乘載客人條件結束--------------------------------------------

  //--------------------------------partC電梯更新資訊------------------------------
  //當partC電梯內部有至少一人(>0)
  //先把電梯當前樓層與第一筆資料的Out最比較
  //判斷電梯該網上還是往下
  //判斷所有在電梯內的乘客最高或最低為幾樓

  if (PartCElevatorInfo.currentPeople > 0) {
    //顯示乘客資訊------------------
    for (let i = 0; i < PartCElevatorPassenger.length; i++) {
      console.log("partC電梯，當前第 " + (i + 1) + "位乘客");
      console.log("partC電梯，在 " + PartCElevatorPassenger[i].In + "進入電梯");
      console.log(
        "partC電梯，在 " + PartCElevatorPassenger[i].Out + "離開電梯"
      );
      console.log("partC電梯，行徑方向 " + PartCElevatorInfo.direction);
    }
    console.log(
      "partC電梯，目前有 " + PartCElevatorInfo.currentPeople + " 位乘客"
    );
  }

  //每次加一秒

  PartCTime++;
  //繪製所經過時間
  PartCTotalTime();
  console.log(
    "最終PartCElevatorInfo.basicTarget為 : " + PartCElevatorInfo.basicTarget
  );

  //如果numberOfPeopleArrived=40，代表所有人已離開電梯，結束動畫
  if (PartCNumberOfPeopleArrived == 40) {
    window.alert("頂底層之間往返循環已完成，總耗時 : " + PartCTime + " 秒。");

    clearInterval(PartCElevatorStart);
  }

  console.log("====================================");

  //--------------------------------partC電梯更新資訊結束------------------------------
}

function partCPassengerGetIntoTheElevator() {
  //繪製電梯旁乘客進入左邊電梯，讓電梯人數++

  if (PartCElevatorInfo.currentPeople == 1) {
    // console.log("重新繪製電梯內人數，目前1人");

    PartCctx.drawImage(
      onePerson,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCElevatorInfo.currentPeople == 2) {
    //console.log("重新繪製電梯內人數，目前2人");

    PartCctx.drawImage(
      twoPeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCElevatorInfo.currentPeople == 3) {
    //console.log("重新繪製電梯內人數，目前3人");

    PartCctx.drawImage(
      threePeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCElevatorInfo.currentPeople == 4) {
    //console.log("重新繪製電梯內人數，目前4人");

    PartCctx.drawImage(
      fourPeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCElevatorInfo.currentPeople == 5) {
    //console.log("重新繪製電梯內人數，目前5人");

    PartCctx.drawImage(
      fivePeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCElevatorInfo.currentPeople == 6) {
    //console.log("重新繪製電梯內人數，目前6人");

    PartCctx.drawImage(
      sixpeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCElevatorInfo.currentPeople == 7) {
    //console.log("重新繪製電梯內人數，目前7人");

    PartCctx.drawImage(
      sevenpeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  }
  //繪製完電梯內乘客後，更新電梯外人數
  let partCFloors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < PartCPeopleInfo.length; i++) {
    if (PartCPeopleInfo[i].status == "offTheElevator") {
      switch (PartCPeopleInfo[i].In) {
        case 0:
          partCFloors[0]++;
          break;
        case 1:
          partCFloors[1]++;
          break;
        case 2:
          partCFloors[2]++;
          break;
        case 3:
          partCFloors[3]++;
          break;
        case 4:
          partCFloors[4]++;
          break;
        case 5:
          partCFloors[5]++;
          break;
        case 6:
          partCFloors[6]++;
          break;
        case 7:
          partCFloors[7]++;
          break;
        case 8:
          partCFloors[8]++;
          break;
        case 9:
          partCFloors[9]++;
          break;
      }
    }
  }

  for (let i = 0; i < partCFloors.length; i++) {
    if (partCFloors[i] == 0) {
      PartCctx.fillStyle = "lightcyan";
      PartCctx.fillRect(40, 570 - i * 60, 30, 30);
    } else if (partCFloors[i] == 1) {
      //console.log("重新繪製" + i + "樓電梯旁人數，剩餘人數 1 ..");

      PartCctx.drawImage(onePerson, 40, 570 - i * 60, 30, 30);
    } else if (partCFloors[i] == 2) {
      PartCctx.drawImage(twoPeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 2 ..");
    } else if (partCFloors[i] == 3) {
      PartCctx.drawImage(threePeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 3 ..");
    } else if (partCFloors[i] == 4) {
      PartCctx.drawImage(fourPeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 4 ..");
    } else if (partCFloors[i] == 5) {
      PartCctx.drawImage(fivePeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 5 ..");
    } else if (partCFloors[i] == 6) {
      PartCctx.drawImage(sixpeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 5 ..");
    } else if (partCFloors[i] == 7) {
      PartCctx.drawImage(sevenpeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 5 ..");
    }
  }
}

function partCPassengerGetOutTheElevator() {
  //繪製剩餘在左邊電梯內人數;
  if (PartCElevatorInfo.currentPeople == 0) {
    PartCctx.drawImage(
      zero,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCElevatorInfo.currentPeople == 1) {
    PartCctx.drawImage(
      onePerson,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCElevatorInfo.currentPeople == 2) {
    PartCctx.drawImage(
      twoPeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCElevatorInfo.currentPeople == 3) {
    PartCctx.drawImage(
      threePeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCElevatorInfo.currentPeople == 4) {
    PartCctx.drawImage(
      fourPeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCElevatorInfo.currentPeople == 5) {
    PartCctx.drawImage(
      fivePeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCElevatorInfo.currentPeople == 6) {
    PartCctx.drawImage(
      sixpeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCElevatorInfo.currentPeople == 7) {
    PartCctx.drawImage(
      sevenpeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 40,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  }
  // 繪製part電梯左邊顯示離開的人數

  if (PartCNumberOfPassengerGetOutTheElevator == 1) {
    PartCctx.drawImage(
      onePerson,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 140,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCNumberOfPassengerGetOutTheElevator == 2) {
    PartCctx.drawImage(
      twoPeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 140,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCNumberOfPassengerGetOutTheElevator == 3) {
    PartCctx.drawImage(
      threePeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 140,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCNumberOfPassengerGetOutTheElevator == 4) {
    PartCctx.drawImage(
      fourPeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 140,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCNumberOfPassengerGetOutTheElevator == 5) {
    PartCctx.drawImage(
      fivePeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 140,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCNumberOfPassengerGetOutTheElevator == 6) {
    PartCctx.drawImage(
      sixpeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 140,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartCNumberOfPassengerGetOutTheElevator == 7) {
    PartCctx.drawImage(
      sevenpeople,
      PartCElevator[PartCElevatorInfo.currentFloor].x + 140,
      PartCElevator[PartCElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  }
  PartCNumberOfPassengerGetOutTheElevator = 0;

  clearInterval(PartCDrawPassengerGetOutTheElevator);
}

let PartCElevatorStart = setInterval(PartCDraw, 1000);

let partCPause = false;
const partCcancelButton = document.getElementById("partCToggleButton");
partCcancelButton.addEventListener("click", () => {
  console.log("按下按鈕.......................");
  partCPause = !partCPause;
  if (partCPause == true) {
    console.log("暫停動畫");
    clearInterval(PartCElevatorStart);
  } else if (partCPause == false) {
    console.log("繼續動畫");

    PartCElevatorStart = setInterval(PartCDraw, 1000);
  }
});

//--------------------------------------------------------------------------------------------------------
//---------------------------------PART C 頂底層之間往返循環結束---------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------
//---------------------------------PART B 比較是否上下去接乘客---------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

const PartBCanvas = document.getElementById("myCanvasPartB");
const PartBctx = PartBCanvas.getContext("2d");
const PartBUnit = 20;
const PartBRow = PartBCanvas.height / PartBUnit;
const PartBColumn = PartBCanvas.width / PartBUnit;

const PartBctxLineWidth = 3;
PartBctx.lineWidth = PartBctxLineWidth;
PartBctx.font = "16px Arial"; // 設置文字的字體和大小

let PartBPeople = 40;
let PartBPeopleInfo = [];
let PartBNumberOfPeopleArrived = 0;
let PartBTime = 0;
let PartBElevator = [];
let PartBDrawPassengerGetIntoTheElevator;
let PartBDrawPassengerGetOutTheElevator;
let partBBookedTheElavator = [];
let PartBNumberOfPassengerGetOutTheElevator = 0;

let initialPassengerGetOnTheElevator = false;
let initialPassengerGetOffTheElevator = false;

let initialPassengerindex;

let bookedPeople = 0;
let PartBElevatorInfo = {
  direction: "",
  currentFloor: "0",
  endFloor: "0",
  currentPeople: "0",
  basicTarget: "none",
  futureDirection: "",
  book: "none",
};

let PartBElevatorPassenger = [];

let PartBUpButton = [];
let PartBDownButton = [];

function PartBCreateElevator() {
  let yLocation = 560;
  for (let i = 0; i < 10; i++) {
    PartBElevator.push({ x: 120, y: yLocation });
    yLocation -= 60;
    PartBctx.fillStyle = "white";
    PartBctx.strokeStyle = "black";
    PartBctx.fillRect(PartBElevator[i].x, PartBElevator[i].y, 120, 50);
    PartBctx.strokeRect(PartBElevator[i].x, PartBElevator[i].y, 120, 50);
  }
}

function PartBCreateUpButton() {
  let yLocation = 570;
  for (let i = 0; i < 10; i++) {
    PartBUpButton.push({ x: 310, y: yLocation });
    yLocation -= 60;
    PartBctx.fillStyle = "white";
    PartBctx.strokeStyle = "black";
    PartBctx.drawImage(imageUp, PartBUpButton[i].x, PartBUpButton[i].y, 30, 30);
    PartBctx.strokeRect(PartBUpButton[i].x, PartBUpButton[i].y, 30, 30);
  }
}
function PartBCreateDownButton() {
  let yLocation = 570;
  for (let i = 0; i < 10; i++) {
    PartBDownButton.push({ x: 350, y: yLocation });
    yLocation -= 60;
    PartBctx.fillStyle = "white";
    PartBctx.strokeStyle = "black";
    PartBctx.drawImage(
      imageDown,
      PartBDownButton[i].x,
      PartBDownButton[i].y,
      30,
      30
    );

    PartBctx.strokeRect(PartBDownButton[i].x, PartBDownButton[i].y, 30, 30);
  }
}
function PartBDrawPeopleCount() {
  PartBctx.fillStyle = "black"; // 設置文字的顏色
  PartBctx.fillText("剩餘人數: " + PartBPeople, 300, 15); // 在指定位置繪製人數信息
}

function PartBTotalTime() {
  PartBctx.fillStyle = "black"; // 設置文字的顏色
  PartBctx.fillText("目前所經過秒數: " + PartBTime, 285, 620); // 在指定位置繪製人數信息
}

PartBCreateElevator();
PartBCreateUpButton();
PartBCreateDownButton();
PartBDrawPeopleCount();
PartBTotalTime();
//繪製電梯目前位置
for (let i = 0; i < 10; i++) {
  if (i == PartBElevatorInfo.currentFloor) {
    PartBctx.fillStyle = "white";
    PartBctx.strokeStyle = "red";
    PartBctx.fillRect(PartBElevator[i].x, PartBElevator[i].y, 120, 50);
    PartBctx.strokeRect(PartBElevator[i].x, PartBElevator[i].y, 120, 50);
  }
}

function PartBDraw() {
  //重置
  PartBctx.fillStyle = "lightcyan";
  PartBctx.fillRect(0, 0, PartBCanvas.width, PartBCanvas.height);

  //繪製剩餘人數
  PartBDrawPeopleCount();

  //繪製電梯
  for (let i = 0; i < 10; i++) {
    PartBctx.fillStyle = "white";
    PartBctx.strokeStyle = "black";
    PartBctx.fillRect(PartBElevator[i].x, PartBElevator[i].y, 120, 50);
    PartBctx.strokeRect(PartBElevator[i].x, PartBElevator[i].y, 120, 50);
    PartBctx.drawImage(imageUp, PartBUpButton[i].x, PartBUpButton[i].y, 30, 30);
    PartBctx.strokeRect(PartBUpButton[i].x, PartBUpButton[i].y, 30, 30);
    PartBctx.drawImage(
      imageDown,
      PartBDownButton[i].x,
      PartBDownButton[i].y,
      30,
      30
    );
    PartBctx.strokeRect(PartBDownButton[i].x, PartBDownButton[i].y, 30, 30);
  }

  //模擬人隨機按電梯按鈕
  if (PartBPeople > 0) {
    //隨機選擇出現樓層
    let chooseFloor = Math.floor(Math.random() * 10);

    //隨機選擇樓層出電梯
    let chooseFloorOut = Math.floor(Math.random() * 10);

    //先判斷時否有進出樓層是否有重覆，沒有的話，透過進出樓層判斷選擇電梯按鈕為上或下
    let direction;
    while (chooseFloorOut == chooseFloor) {
      //console.log("樓層重覆");
      chooseFloorOut = Math.floor(Math.random() * 10);
    }
    if (chooseFloorOut > chooseFloor) {
      direction = "up";
    } else {
      direction = "down";
    }
    //紀錄每個人的資料，放在陣列當中
    PartBPeopleInfo.push({
      In: chooseFloor,
      Out: chooseFloorOut,
      direction: direction,
      status: "offTheElevator",
      elevatorResponse: "none",
      arrive: "none",
      bookTheElevator: "none",
    });

    PartBPeople--;
  }

  //判斷partB電梯往上還是往下
  if (
    PartBElevatorInfo.direction == "up" &&
    PartBElevatorInfo.currentFloor < 9
  ) {
    PartBElevatorInfo.currentFloor++;
    console.log("partB電梯上樓");
  } else if (
    PartBElevatorInfo.direction == "down" &&
    PartBElevatorInfo.currentFloor > 0
  ) {
    PartBElevatorInfo.currentFloor--;
    console.log("partB電梯下樓");
  }

  //繪製電梯移動後位置
  for (let i = 0; i < 10; i++) {
    if (i == PartBElevatorInfo.currentFloor) {
      console.log(
        "partB電梯，當前位於 " + PartBElevatorInfo.currentFloor + " 樓"
      );
      PartBctx.fillStyle = "white";
      PartBctx.strokeStyle = "red";
      PartBctx.fillRect(PartBElevator[i].x, PartBElevator[i].y, 120, 50);
      PartBctx.strokeRect(PartBElevator[i].x, PartBElevator[i].y, 120, 50);
      //繪製電梯內人數;
      if (PartBElevatorInfo.currentPeople == 1) {
        PartBctx.drawImage(
          onePerson,
          PartBElevator[i].x + 40,
          PartBElevator[i].y + 10,
          30,
          30
        );
      } else if (PartBElevatorInfo.currentPeople == 2) {
        PartBctx.drawImage(
          twoPeople,
          PartBElevator[i].x + 40,
          PartBElevator[i].y + 10,
          30,
          30
        );
      } else if (PartBElevatorInfo.currentPeople == 3) {
        PartBctx.drawImage(
          threePeople,
          PartBElevator[i].x + 40,
          PartBElevator[i].y + 10,
          30,
          30
        );
      } else if (PartBElevatorInfo.currentPeople == 4) {
        PartBctx.drawImage(
          fourPeople,
          PartBElevator[i].x + 40,
          PartBElevator[i].y + 10,
          30,
          30
        );
      } else if (PartBElevatorInfo.currentPeople == 5) {
        PartBctx.drawImage(
          fivePeople,
          PartBElevator[i].x + 40,
          PartBElevator[i].y + 10,
          30,
          30
        );
      }
    }
  }

  //移動完後，判斷是否有人要出電梯
  //出電梯後，資料從PartBElevatorPassenger刪除，且PartBPeopleInfo.arrive設置為yes
  for (let i = 0; i < PartBElevatorPassenger.length; i++) {
    //判斷乘客Out樓層是否與當前樓層一樣
    if (PartBElevatorPassenger[i].Out == PartBElevatorInfo.currentFloor) {
      if (PartBElevatorPassenger[i].elevatorResponse == "Yes") {
        initialPassengerGetOffTheElevator = true;
        console.log("初始者離開電梯");
      }
      if (
        PartBElevatorPassenger[i].bookTheElevator == "booked" &&
        PartBElevatorPassenger[i].arrive == "none"
      ) {
        bookedPeople--;

        console.log("booked乘客離開電梯，剩餘bookedpeople為:" + bookedPeople);
      }

      //樓層一樣，將peopleInfo.arrive 設置為 arrived
      //且將在leftElevatorPassenger的資料刪除
      PartBElevatorPassenger[i].arrive == "arrived";
      PartBPeopleInfo.arrive = "arrived";
      PartBElevatorPassenger.splice(i, 1);
      i--; //因為砍掉一筆資料，所以讓i-1，而後迴圈中的i++會在檢測一次往前推送的資料
      PartBElevatorInfo.currentPeople--;
      PartBNumberOfPeopleArrived++;
      console.log(
        "partB電梯，有乘客離開，目前剩餘乘客數量為 : " +
          PartBElevatorInfo.currentPeople
      );
      PartBNumberOfPassengerGetOutTheElevator++;

      console.log("總共有 " + PartBNumberOfPeopleArrived + " 位乘客已離開");

      //如果電梯內所有乘客都離開
      if (
        PartBElevatorInfo.currentPeople == 0 &&
        initialPassengerGetOnTheElevator
      ) {
        PartBElevatorInfo.basicTarget = "none";
        console.log(
          "將partB ElevatorInfo.basicTarget設置為none 且將 PartBElevatorInfo.direction 設定為空白 "
        );
        PartBElevatorInfo.direction = "";
        PartBElevatorInfo.futureDirection = "";
        initialPassengerGetOnTheElevator = false;
        initialPassengerGetOffTheElevator = false;
        console.log(
          "所以乘客都已離開，將initialPassengerGetOnTheElevator變更為:" +
            initialPassengerGetOnTheElevator
        );
      }
    }
  }

  //當有人上面從for迴圈離開電梯，用來顯示離開人數的動畫
  if (PartBNumberOfPassengerGetOutTheElevator != 0) {
    PartBDrawPassengerGetOutTheElevator = setInterval(
      partBPassengerGetOutTheElevator,
      500
    );
  }

  //新增乘客資料後，用FOR迴圈顯示哪些按鈕目前有被按下
  for (let i = 0; i < PartBPeopleInfo.length; i++) {
    if (PartBPeopleInfo[i].status == "offTheElevator") {
      if (PartBPeopleInfo[i].direction == "up") {
        PartBctx.fillStyle = "white";
        PartBctx.strokeStyle = "red";
        PartBctx.drawImage(
          imageUp,
          PartBUpButton[PartBPeopleInfo[i].In].x,
          PartBUpButton[PartBPeopleInfo[i].In].y,
          30,
          30
        );
        PartBctx.strokeRect(
          PartBUpButton[PartBPeopleInfo[i].In].x,
          PartBUpButton[PartBPeopleInfo[i].In].y,
          30,
          30
        );
      } else {
        PartBctx.fillStyle = "white";
        PartBctx.strokeStyle = "red";
        PartBctx.drawImage(
          imageDown,
          PartBDownButton[PartBPeopleInfo[i].In].x,
          PartBDownButton[PartBPeopleInfo[i].In].y,
          30,
          30
        );
        PartBctx.strokeRect(
          PartBDownButton[PartBPeopleInfo[i].In].x,
          PartBDownButton[PartBPeopleInfo[i].In].y,
          30,
          30
        );
      }
    }
  }

  //用for迴圈顯示電梯邊有多少人在等待
  let PartBFloors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < PartBPeopleInfo.length; i++) {
    if (PartBPeopleInfo[i].status == "offTheElevator") {
      switch (PartBPeopleInfo[i].In) {
        case 0:
          PartBFloors[0]++;
          break;
        case 1:
          PartBFloors[1]++;
          break;
        case 2:
          PartBFloors[2]++;
          break;
        case 3:
          PartBFloors[3]++;
          break;
        case 4:
          PartBFloors[4]++;
          break;
        case 5:
          PartBFloors[5]++;
          break;
        case 6:
          PartBFloors[6]++;
          break;
        case 7:
          PartBFloors[7]++;
          break;
        case 8:
          PartBFloors[8]++;
          break;
        case 9:
          PartBFloors[9]++;
          break;
      }
    }
  }
  //console.log("partB電梯目前每個樓層等待人數 : " + PartBFloors);

  for (let i = 0; i < PartBFloors.length; i++) {
    if (PartBFloors[i] == 1) {
      PartBctx.drawImage(onePerson, 40, 570 - i * 60, 30, 30);
    } else if (PartBFloors[i] == 2) {
      PartBctx.drawImage(twoPeople, 40, 570 - i * 60, 30, 30);
    } else if (PartBFloors[i] == 3) {
      PartBctx.drawImage(threePeople, 40, 570 - i * 60, 30, 30);
    } else if (PartBFloors[i] == 4) {
      PartBctx.drawImage(fourPeople, 40, 570 - i * 60, 30, 30);
    } else if (PartBFloors[i] == 5) {
      PartBctx.drawImage(fivePeople, 40, 570 - i * 60, 30, 30);
    }
  }

  //-------------------------------partB電梯初始化設定---------------------------------------------
  //判斷電梯有無basicTarget作為基準，
  //在這裡設置好電梯行徑方向與當前最高或最低樓層
  //左邊電梯
  if (PartBElevatorInfo.basicTarget == "none") {
    console.log("進入到設定partB電梯初始迴圈");

    //目前電梯內沒有乘客，也沒有基準
    //從peopelInfo讀取一筆乘客資料status為offTheElevator，且elevatorResponse為none作為基準
    //將該筆資料的In當作endFloor
    //且判斷電梯運行方向
    for (let i = 0; i < PartBPeopleInfo.length; i++) {
      console.log("進入到找取作為電梯basicTarget基準的資料迴圈中");
      if (
        PartBPeopleInfo[i].status == "offTheElevator" &&
        PartBPeopleInfo[i].elevatorResponse == "none"
      ) {
        PartBElevatorInfo.endFloor = PartBPeopleInfo[i].In;
        PartBPeopleInfo[i].elevatorResponse = "Yes";
        initialPassengerindex = i;
        PartBElevatorInfo.basicTarget = "Yes";
        console.log(
          "找到初始乘客，將endFloor設置為去接乘客的樓層:" +
            PartBPeopleInfo[i].In +
            "，將第 " +
            i +
            " 個乘客的elevatorResponse設定為Yes，電梯的basicTarget，設置為: " +
            PartBElevatorInfo.basicTarget
        );

        if (PartBElevatorInfo.currentFloor < PartBPeopleInfo[i].In) {
          PartBElevatorInfo.direction = "up";
          console.log("將電梯方向設置為up");
        } else if (PartBElevatorInfo.currentFloor > PartBPeopleInfo[i].In) {
          PartBElevatorInfo.direction = "down";
          console.log("將電梯方向設置為down");
        } else if (PartBElevatorInfo.currentFloor == PartBPeopleInfo[i].In) {
          PartBElevatorInfo.direction = PartBPeopleInfo[i].direction;
          console.log("將電梯方向設置為" + PartBPeopleInfo[i].direction);
        }
        //判斷電梯主體走向
        PartBElevatorInfo.futureDirection = PartBPeopleInfo[i].direction;

        break;
      }
    }
    console.log(
      "partB電梯主體方向為: " +
        PartBElevatorInfo.futureDirection +
        "接客方向為: " +
        PartBElevatorInfo.direction +
        "接客樓層為: " +
        PartBElevatorInfo.endFloor
    );
  }
  //-------------------------------partB電梯初始化設定結束------------------------------------------

  //-------------------------------partB電梯找尋距離電梯較近的乘客----------------------------------

  //尚未接到初始化乘客，比較 電梯離ENDFLOOR進，還是離其他乘客的IN進，如果乘客比較近
  //將PartBPeopleInfo的bookTheElevator 設為 booked
  let a = 0;
  //初始化乘客尚未離開電梯
  if (initialPassengerGetOffTheElevator == false) {
    for (let i = 0; i < PartBPeopleInfo.length; i++) {
      if (
        PartBPeopleInfo[i].bookTheElevator == "none" &&
        PartBPeopleInfo[i].elevatorResponse == "none"
      ) {
        if (initialPassengerGetOnTheElevator == false) {
          if (a == 0) {
            PartBElevatorInfo.endFloor =
              PartBPeopleInfo[initialPassengerindex].In;
            console.log(
              "將PartBElevatorInfo.endFloor更改為: " +
                PartBElevatorInfo.endFloor
            );
            a++;
          }

          if (PartBElevatorInfo.futureDirection == "up") {
            console.log(
              "尚未接到初始化乘客，且主體方向為上，開始比較比到達endFLoor還近的乘客"
            );
            if (
              PartBPeopleInfo[i].bookTheElevator == "none" &&
              PartBPeopleInfo[i].direction == "up" &&
              Math.abs(
                PartBElevatorInfo.currentFloor - PartBPeopleInfo[i].In
              ) <=
                Math.abs(
                  PartBElevatorInfo.endFloor - PartBElevatorInfo.currentFloor
                ) &&
              bookedPeople < 6
            ) {
              PartBPeopleInfo[i].bookTheElevator = "booked";

              bookedPeople++;
              console.log(
                "將第" +
                  i +
                  "位乘客的bookTheElevator設為booked，目前bookedpoeple有" +
                  bookedPeople +
                  "位"
              );
            }
          } else if (PartBElevatorInfo.futureDirection == "down") {
            console.log("尚未接到初始化乘客，且主體方向為下，開始比較較近乘客");

            if (
              PartBPeopleInfo[i].bookTheElevator == "none" &&
              PartBPeopleInfo[i].direction == "down" &&
              Math.abs(
                PartBElevatorInfo.currentFloor - PartBPeopleInfo[i].In
              ) <=
                Math.abs(
                  PartBElevatorInfo.currentFloor - PartBElevatorInfo.endFloor
                ) &&
              bookedPeople < 6
            ) {
              {
                PartBPeopleInfo[i].bookTheElevator = "booked";
                bookedPeople++;

                console.log(
                  "將第" +
                    i +
                    "位乘客的bookTheElevator設為booked，目前bookedpoeple有" +
                    bookedPeople +
                    "位"
                );
              }
            }
          }
        } else if (initialPassengerGetOnTheElevator == true) {
          if (a == 0) {
            PartBElevatorInfo.endFloor =
              PartBPeopleInfo[initialPassengerindex].Out;
            console.log(
              "將PartBElevatorInfo.endFloor更改為: " +
                PartBElevatorInfo.endFloor
            );
            a++;
          }

          if (PartBElevatorInfo.futureDirection == "up") {
            console.log("已經接到初始化乘客，且主體方向為上，開始比較較近乘客");
            if (
              PartBPeopleInfo[i].bookTheElevator == "none" &&
              PartBPeopleInfo[i].direction == "up" &&
              Math.abs(
                PartBElevatorInfo.currentFloor - PartBPeopleInfo[i].In
              ) <=
                Math.abs(
                  PartBElevatorInfo.endFloor - PartBElevatorInfo.currentFloor
                ) &&
              bookedPeople < 6
            ) {
              PartBPeopleInfo[i].bookTheElevator = "booked";
              bookedPeople++;

              console.log(
                "將第" +
                  i +
                  "位乘客的bookTheElevator設為booked，目前bookedpoeple有" +
                  bookedPeople +
                  "位"
              );
            }
          } else if (PartBElevatorInfo.futureDirection == "down") {
            console.log("已經接到初始化乘客，且主體方向為下，開始比較較近乘客");
            if (
              PartBPeopleInfo[i].bookTheElevator == "none" &&
              PartBPeopleInfo[i].direction == "down" &&
              Math.abs(
                PartBElevatorInfo.currentFloor - PartBPeopleInfo[i].In
              ) <=
                Math.abs(
                  PartBElevatorInfo.currentFloor - PartBElevatorInfo.endFloor
                ) &&
              bookedPeople < 6
            ) {
              PartBPeopleInfo[i].bookTheElevator = "booked";
              bookedPeople++;

              console.log(
                "將第" +
                  i +
                  "位乘客的bookTheElevator設為booked，目前bookedpoeple有" +
                  bookedPeople +
                  "位"
              );
            }
          }
        }
      }
    }
  } //初始化乘客已經離開電梯
  else if (initialPassengerGetOffTheElevator) {
    for (let i = 0; i < PartBPeopleInfo.length; i++) {
      if (
        PartBPeopleInfo[i].bookTheElevator == "none" &&
        PartBPeopleInfo[i].elevatorResponse == "none"
      ) {
        if (a == 0) {
          PartBElevatorInfo.endFloor = PartBElevatorPassenger[0].Out;
          console.log(
            "將PartBElevatorInfo.endFloor更改為: " + PartBElevatorInfo.endFloor
          );
          a++;
        }

        if (PartBElevatorInfo.futureDirection == "up") {
          console.log("初始化乘客已經離開，且主體方向為上，開始比較較近乘客");
          if (
            PartBPeopleInfo[i].bookTheElevator == "none" &&
            PartBPeopleInfo[i].direction == "up" &&
            Math.abs(PartBElevatorInfo.currentFloor - PartBPeopleInfo[i].In) <=
              Math.abs(
                PartBElevatorInfo.endFloor - PartBElevatorInfo.currentFloor
              ) &&
            bookedPeople < 7
          ) {
            PartBPeopleInfo[i].bookTheElevator = "booked";
            bookedPeople++;

            console.log(
              "將第" +
                i +
                "位乘客的bookTheElevator設為booked，目前bookedpoeple有" +
                bookedPeople +
                "位"
            );
          }
        } else if (PartBElevatorInfo.futureDirection == "down") {
          if (
            PartBPeopleInfo[i].bookTheElevator == "none" &&
            PartBPeopleInfo[i].direction == "down" &&
            Math.abs(PartBElevatorInfo.currentFloor - PartBPeopleInfo[i].In) <=
              Math.abs(
                PartBElevatorInfo.currentFloor - PartBElevatorInfo.endFloor
              ) &&
            bookedPeople < 7
          ) {
            PartBPeopleInfo[i].bookTheElevator = "booked";
            bookedPeople++;

            console.log(
              "將第" +
                i +
                "位乘客的bookTheElevator設為booked，目前bookedpoeple有" +
                bookedPeople +
                "位"
            );
          }
        }
      }
    }
  }

  console.log("目前有 " + bookedPeople + " 位bookedPeople");

  //---------partB電梯找尋距離電梯較近的乘客，將bookTheElevator設為booked代表電梯會去接乘客------------

  //-------------------------------partB電梯乘載客人條件-------------------------------------------
  //判斷所有還未上電梯的乘客，是否有符合條件可以搭乘partB電梯
  for (let i = 0; i < PartBPeopleInfo.length; i++) {
    //以下為elevatorResponse = "Yes"  也就是被當作初始化 的乘客
    if (
      PartBPeopleInfo[i].elevatorResponse == "Yes" &&
      PartBPeopleInfo[i].status == "offTheElevator" &&
      PartBPeopleInfo[i].In == PartBElevatorInfo.currentFloor
    ) {
      PartBElevatorPassenger.push({
        Index: i,
        In: PartBPeopleInfo[i].In,
        Out: PartBPeopleInfo[i].Out,
        direction: PartBPeopleInfo[i].direction,
        elevatorResponse: "Yes",
        arrive: "none",
      });

      initialPassengerGetOnTheElevator = true;

      if (initialPassengerGetOnTheElevator) {
        console.log(
          "剛接到初始乘客，因為會更新endFloor，所以再判斷一次是否要去接其他乘客"
        );
        PartBElevatorInfo.endFloor = PartBPeopleInfo[initialPassengerindex].Out;
        console.log(
          "接到初始乘客後，將PartBElevatorInfo.endFloor更改為: " +
            PartBElevatorInfo.endFloor
        );
        for (let i = 0; i < PartBPeopleInfo.length; i++) {
          if (
            PartBElevatorInfo.futureDirection == "up" &&
            PartBPeopleInfo[i].elevatorResponse == "none"
          ) {
            console.log("已經接到初始化乘客，且主體方向為上，開始比較較近乘客");
            if (
              PartBPeopleInfo[i].bookTheElevator == "none" &&
              PartBPeopleInfo[i].direction == "up" &&
              Math.abs(
                PartBElevatorInfo.currentFloor - PartBPeopleInfo[i].In
              ) <=
                Math.abs(
                  PartBElevatorInfo.endFloor - PartBElevatorInfo.currentFloor
                ) &&
              bookedPeople < 6
            ) {
              PartBPeopleInfo[i].bookTheElevator = "booked";
              bookedPeople++;

              console.log(
                "將第" +
                  i +
                  "位乘客的bookTheElevator設為booked，目前bookedpoeple有" +
                  bookedPeople +
                  "位"
              );
            }
          } else if (
            PartBElevatorInfo.futureDirection == "down" &&
            PartBPeopleInfo[i].elevatorResponse == "none"
          ) {
            console.log("已經接到初始化乘客，且主體方向為下，開始比較較近乘客");

            for (let i = 0; i < PartBPeopleInfo.length; i++) {
              if (
                PartBPeopleInfo[i].bookTheElevator == "none" &&
                PartBPeopleInfo[i].elevatorResponse == "none" &&
                PartBPeopleInfo[i].direction == "down" &&
                Math.abs(
                  PartBElevatorInfo.currentFloor - PartBPeopleInfo[i].In
                ) <=
                  Math.abs(
                    PartBElevatorInfo.currentFloor - PartBElevatorInfo.endFloor
                  ) &&
                bookedPeople < 6
              ) {
                PartBPeopleInfo[i].bookTheElevator = "booked";
                bookedPeople++;

                console.log(
                  "將第" +
                    i +
                    "位乘客的bookTheElevator設為booked，目前bookedpoeple有" +
                    bookedPeople +
                    "位"
                );
              }
            }
          }
        }
      }

      PartBPeopleInfo[i].status = "onTheElevator";
      PartBElevatorInfo.currentPeople++;
      console.log(
        "初始乘客上車，initialPassengerGetOnTheElevator變更為:" +
          initialPassengerGetOnTheElevator +
          "目前總共有" +
          PartBElevatorInfo.currentPeople +
          " 位搭乘在電梯內"
      );
    }

    //以下為 預約電梯 的乘客

    if (initialPassengerGetOnTheElevator) {
      if (
        PartBPeopleInfo[i].bookTheElevator == "booked" &&
        PartBPeopleInfo[i].status == "offTheElevator" &&
        PartBPeopleInfo[i].In == PartBElevatorInfo.currentFloor &&
        PartBElevatorInfo.currentPeople < 7
      ) {
        PartBElevatorPassenger.push({
          Index: i,
          In: PartBPeopleInfo[i].In,
          Out: PartBPeopleInfo[i].Out,
          direction: PartBPeopleInfo[i].direction,
          bookTheElevator: "booked",
          arrive: "none",
        });

        PartBPeopleInfo[i].status = "onTheElevator";
        PartBElevatorInfo.currentPeople++;

        console.log(
          "已接到初始乘客，為booked的乘客上車，目前總共有 " +
            PartBElevatorInfo.currentPeople +
            " 位搭乘在電梯內"
        );
      }
    } else if (initialPassengerGetOnTheElevator == false) {
      if (
        PartBPeopleInfo[i].bookTheElevator == "booked" &&
        PartBPeopleInfo[i].status == "offTheElevator" &&
        PartBPeopleInfo[i].In == PartBElevatorInfo.currentFloor &&
        PartBElevatorInfo.currentPeople < 6
      ) {
        PartBElevatorPassenger.push({
          Index: i,
          In: PartBPeopleInfo[i].In,
          Out: PartBPeopleInfo[i].Out,
          direction: PartBPeopleInfo[i].direction,
          bookTheElevator: "booked",
          arrive: "none",
        });

        PartBPeopleInfo[i].status = "onTheElevator";
        PartBElevatorInfo.currentPeople++;

        console.log(
          "尚未接到初始乘客，為booked的乘客上車，目前總共有 " +
            PartBElevatorInfo.currentPeople +
            " 位搭乘在電梯內"
        );
      }
    }

    PartBDrawPassengerGetIntoTheElevator = setInterval(
      partBPassengerGetIntoTheElevator,
      500
    );
  }

  //-------------------------------partB電梯乘載客人條件結束--------------------------------------------

  ////-----------顯示乘客資訊------------------
  if (PartBElevatorInfo.currentPeople > 0) {
    console.log(
      "partB電梯，目前有 " + PartBElevatorInfo.currentPeople + " 位乘客"
    );
    for (let i = 0; i < PartBElevatorPassenger.length; i++) {
      if (PartBElevatorPassenger[i].elevatorResponse == "Yes") {
        console.log(
          "partB電梯，當前第 " +
            i +
            "位乘客，" +
            "在 " +
            PartBElevatorPassenger[i].In +
            "進入電梯，" +
            "會在 " +
            PartBElevatorPassenger[i].Out +
            "離開電梯，" +
            "行徑方向， " +
            PartBElevatorPassenger[i].direction +
            "為初始乘客"
        );
      } else {
        console.log(
          "partB電梯，當前第 " +
            i +
            "位乘客，" +
            "在 " +
            PartBElevatorPassenger[i].In +
            "進入電梯，" +
            "會在 " +
            PartBElevatorPassenger[i].Out +
            "離開電梯，" +
            "行徑方向， " +
            PartBElevatorPassenger[i].direction +
            "，booked狀態" +
            PartBElevatorPassenger[i].bookTheElevator
        );
      }
    }
  }
  //--------------------------------partB設定電梯direction-----------------------------

  let Bottom;
  let BottomIndex;
  let topmost;
  let topmostIndex;

  for (let i = 0; i < PartBPeopleInfo.length; i++) {
    if (
      (PartBPeopleInfo[i].bookTheElevator == "booked" &&
        PartBPeopleInfo[i].status == "offTheElevator") ||
      (PartBPeopleInfo[i].elevatorResponse == "Yes" &&
        PartBPeopleInfo[i].status == "offTheElevator")
    ) {
      if (PartBPeopleInfo[i].direction == "up") {
        Bottom = PartBPeopleInfo[i].In;
        BottomIndex = i;
        console.log("初始化BottomIndex為:" + BottomIndex + " 樓層為" + Bottom);
        break;
      } else if (PartBPeopleInfo[i].direction == "down") {
        topmost = PartBPeopleInfo[i].In;
        topmostIndex = i;
        console.log(
          "初始化topmostIndex為:" + topmostIndex + " 樓層為" + topmost
        );
        break;
      }
    }
  }

  if (initialPassengerGetOnTheElevator == false) {
    PartBElevatorInfo.endFloor = PartBPeopleInfo[initialPassengerindex].In;
    console.log(
      "將PartBElevatorInfo.endFloor更改為: " + PartBElevatorInfo.endFloor
    );
    //初始者還沒上電梯
    if (PartBElevatorInfo.currentPeople < bookedPeople) {
      //還有booked的乘客還沒上電梯
      if (PartBElevatorInfo.futureDirection == "up") {
        //主體方向為up，找出booked裡面最低層的乘客
        for (let i = 1; i < PartBPeopleInfo.length; i++) {
          //找出是booked的乘客，但還沒上電梯
          if (
            (PartBPeopleInfo[i].bookTheElevator == "booked" &&
              PartBPeopleInfo[i].status == "offTheElevator") ||
            (PartBPeopleInfo[i].elevatorResponse == "Yes" &&
              PartBPeopleInfo[i].status == "offTheElevator")
          ) {
            if (PartBPeopleInfo[i].In <= Bottom) {
              Bottom = PartBPeopleInfo[i].In;
              BottomIndex = i;
              console.log("更新後，BottomIndex為:" + BottomIndex);
            }
          }
        }
      } else if (PartBElevatorInfo.futureDirection == "down") {
        //主體方向為down，找出booked裡面最高層的乘客
        for (let i = 0; i < PartBPeopleInfo.length; i++) {
          //找出是booked或是初始者的乘客，但還沒上電梯

          if (
            (PartBPeopleInfo[i].bookTheElevator == "booked" &&
              PartBPeopleInfo[i].status == "offTheElevator") ||
            (PartBPeopleInfo[i].elevatorResponse == "Yes" &&
              PartBPeopleInfo[i].status == "offTheElevator")
          ) {
            if (PartBPeopleInfo[i].In >= topmost) {
              topmost = PartBPeopleInfo[i].In;
              topmostIndex = i;
              console.log("topmostIndex為:" + topmostIndex);
            }
          }
        }
      }
      let distance = Math.abs(
        PartBElevatorInfo.currentFloor - PartBElevatorInfo.endFloor
      );
      if (PartBElevatorInfo.futureDirection == "up") {
        if (Bottom < PartBElevatorInfo.currentFloor) {
          PartBElevatorInfo.direction = "down";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        } else if (Bottom >= PartBElevatorInfo.currentFloor) {
          PartBElevatorInfo.direction = "up";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        }
      } else if (PartBElevatorInfo.futureDirection == "down") {
        if (topmost > PartBElevatorInfo.currentFloor) {
          PartBElevatorInfo.direction = "up";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        } else if (topmost <= PartBElevatorInfo.currentFloor) {
          PartBElevatorInfo.direction = "down";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        }
      }
    } else if (PartBElevatorInfo.currentPeople == bookedPeople) {
      //booked的乘客都已上電梯，去接初始乘客
      if (PartBElevatorInfo.endFloor < PartBElevatorInfo.currentFloor) {
        PartBElevatorInfo.direction = "down";
        console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
      } else if (PartBElevatorInfo.endFloor > PartBElevatorInfo.currentFloor) {
        PartBElevatorInfo.direction = "up";
        console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
      }
    }
  } else if (
    initialPassengerGetOnTheElevator &&
    initialPassengerGetOffTheElevator == false
  ) {
    PartBElevatorInfo.endFloor = PartBPeopleInfo[initialPassengerindex].Out;
    console.log(
      "已接到初始乘客，將PartBElevatorInfo.endFloor更改為離開樓層，為: " +
        PartBElevatorInfo.endFloor
    );
    //初始者已經上電梯
    if (PartBElevatorInfo.currentPeople - 1 < bookedPeople) {
      console.log("還有booked的乘客還沒上電梯");
      if (PartBElevatorInfo.futureDirection == "up") {
        console.log("主體方向為up，找出booked裡面最低層的乘客");
        for (let i = 1; i < PartBPeopleInfo.length; i++) {
          console.log("找出是booked的乘客，但還沒上電梯");
          if (
            PartBPeopleInfo[i].bookTheElevator == "booked" &&
            PartBPeopleInfo[i].status == "offTheElevator"
          ) {
            if (PartBPeopleInfo[i].In <= Bottom) {
              Bottom = PartBPeopleInfo[i].In;
              BottomIndex = i;
              console.log("更新後，BottomIndex為:" + BottomIndex);
            }
          }
        }
      } else if (PartBElevatorInfo.futureDirection == "down") {
        console.log("主體方向為down，找出booked裡面最高層的乘客");
        for (let i = 0; i < PartBPeopleInfo.length; i++) {
          console.log("找出是booked的乘客，但還沒上電梯");

          if (
            PartBPeopleInfo[i].bookTheElevator == "booked" &&
            PartBPeopleInfo[i].status == "offTheElevator"
          ) {
            if (PartBPeopleInfo[i].In >= topmost) {
              topmost = PartBPeopleInfo[i].In;
              topmostIndex = i;
              console.log("topmostIndex為:" + topmostIndex);
            }
          }
        }
      }
      let distance = Math.abs(
        PartBElevatorInfo.currentFloor - PartBElevatorInfo.endFloor
      );
      if (PartBElevatorInfo.futureDirection == "up") {
        if (Bottom < PartBElevatorInfo.currentFloor) {
          PartBElevatorInfo.direction = "down";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        } else if (Bottom >= PartBElevatorInfo.currentFloor) {
          PartBElevatorInfo.direction = "up";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        }
      } else if (PartBElevatorInfo.futureDirection == "down") {
        if (topmost > PartBElevatorInfo.currentFloor) {
          PartBElevatorInfo.direction = "up";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        } else if (topmost <= PartBElevatorInfo.currentFloor) {
          PartBElevatorInfo.direction = "down";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        }
      }
    } else if (PartBElevatorInfo.currentPeople - 1 == bookedPeople) {
      //booked跟初始的乘客都已上電梯，找出endFloor
      let finalFloor = PartBElevatorPassenger[0].Out;
      for (let i = 0; i < PartBElevatorPassenger.length; i++) {
        if (PartBElevatorInfo.futureDirection == "up") {
          if (PartBElevatorPassenger[i].Out >= finalFloor) {
            finalFloor = PartBElevatorPassenger[i].Out;
          }
        } else if (PartBElevatorInfo.futureDirection == "down") {
          if (PartBElevatorPassenger[i].Out <= finalFloor) {
            finalFloor = PartBElevatorPassenger[i].Out;
          }
        }
      }
      console.log("finalFloor為:" + finalFloor);
      if (PartBElevatorInfo.futureDirection == "up") {
        if (PartBElevatorInfo.currentFloor < finalFloor) {
          PartBElevatorInfo.direction = "up";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        }
      } else if (PartBElevatorInfo.futureDirection == "down") {
        if (PartBElevatorInfo.currentFloor > finalFloor) {
          PartBElevatorInfo.direction = "down";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        }
      }
    }
  } else if (
    initialPassengerGetOnTheElevator &&
    initialPassengerGetOffTheElevator
  ) {
    PartBElevatorInfo.endFloor = PartBPeopleInfo[initialPassengerindex].Out;
    console.log("進入到初始者已經離開電梯後，但還有booked乘客，判斷方向");
    //初始者已經離開電梯
    if (PartBElevatorInfo.currentPeople < bookedPeople) {
      console.log("還有booked的乘客還沒上電梯");
      if (PartBElevatorInfo.futureDirection == "up") {
        console.log("主體方向為up，找出booked裡面最低層的乘客");
        for (let i = 0; i < PartBPeopleInfo.length; i++) {
          if (
            PartBPeopleInfo[i].bookTheElevator == "booked" &&
            PartBPeopleInfo[i].status == "offTheElevator"
          ) {
            console.log("找出是booked的乘客，但還沒上電梯");

            if (PartBPeopleInfo[i].In <= Bottom) {
              Bottom = PartBPeopleInfo[i].In;
              BottomIndex = i;
              console.log("更新後，BottomIndex為:" + BottomIndex);
            }
          }
        }
      } else if (PartBElevatorInfo.futureDirection == "down") {
        console.log("主體方向為down，找出booked裡面最高層的乘客");
        for (let i = 0; i < PartBPeopleInfo.length; i++) {
          if (
            PartBPeopleInfo[i].bookTheElevator == "booked" &&
            PartBPeopleInfo[i].status == "offTheElevator"
          ) {
            console.log("找出是booked的乘客，但還沒上電梯");

            if (PartBPeopleInfo[i].In >= topmost) {
              topmost = PartBPeopleInfo[i].In;
              topmostIndex = i;
              console.log("topmostIndex為:" + topmostIndex);
            }
          }
        }
      }
      let distance = Math.abs(
        PartBElevatorInfo.currentFloor - PartBElevatorInfo.endFloor
      );
      if (PartBElevatorInfo.futureDirection == "up") {
        if (Bottom < PartBElevatorInfo.currentFloor) {
          PartBElevatorInfo.direction = "down";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        } else if (Bottom >= PartBElevatorInfo.currentFloor) {
          PartBElevatorInfo.direction = "up";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        }
      } else if (PartBElevatorInfo.futureDirection == "down") {
        if (topmost > PartBElevatorInfo.currentFloor) {
          PartBElevatorInfo.direction = "up";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        } else if (topmost <= PartBElevatorInfo.currentFloor) {
          PartBElevatorInfo.direction = "down";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        }
      }
    } else if (PartBElevatorInfo.currentPeople == bookedPeople) {
      //booked跟初始的乘客都已上電梯，找出endFloor
      let finalFloor = PartBElevatorPassenger[0].Out;
      for (let i = 0; i < PartBElevatorPassenger.length; i++) {
        if (PartBElevatorInfo.futureDirection == "up") {
          if (PartBElevatorPassenger[i].Out >= finalFloor) {
            finalFloor = PartBElevatorPassenger[i].Out;
          }
        } else if (PartBElevatorInfo.futureDirection == "down") {
          if (PartBElevatorPassenger[i].Out <= finalFloor) {
            finalFloor = PartBElevatorPassenger[i].Out;
          }
        }
      }
      console.log("finalFloor為:" + finalFloor);
      if (PartBElevatorInfo.futureDirection == "up") {
        if (PartBElevatorInfo.currentFloor < finalFloor) {
          PartBElevatorInfo.direction = "up";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        }
      } else if (PartBElevatorInfo.futureDirection == "down") {
        if (PartBElevatorInfo.currentFloor > finalFloor) {
          PartBElevatorInfo.direction = "down";
          console.log("電梯更改方向為:" + PartBElevatorInfo.direction);
        }
      }
    }
  }

  //每次加一秒
  PartBTime++;
  //繪製所經過時間
  PartBTotalTime();
  console.log(
    "最終PartBElevatorInfo.basicTarget為 : " + PartBElevatorInfo.basicTarget
  );

  console.log("最終電梯方向為 : " + PartBElevatorInfo.direction);
  console.log("目前booked的乘客有" + bookedPeople + "位");
  //如果numberOfPeopleArrived=40，代表所有人已離開電梯，結束動畫
  if (PartBNumberOfPeopleArrived == 40) {
    window.alert("比較是否上下去接乘客已完成，總耗時 : " + PartBTime + " 秒。");

    clearInterval(PartBElevatorStart);
  }

  //目前有多少人尚未搭乘電梯
  let partBNumberOfoffTheElevator = 0;
  for (let i = 0; i < PartBPeopleInfo.length; i++) {
    if (PartBPeopleInfo[i].status == "offTheElevator") {
      partBNumberOfoffTheElevator++;
      console.log(
        "第" +
          i +
          "位乘客尚未搭乘電梯，將在" +
          PartBPeopleInfo[i].In +
          "樓進入電梯，在" +
          PartBPeopleInfo[i].Out +
          "樓出電梯，搭乘方向為" +
          PartBPeopleInfo[i].direction +
          " ，bookedTheElevator狀態" +
          PartBPeopleInfo[i].bookTheElevator
      );
    }
  }
  console.log(
    "partB電梯，目前有 " + partBNumberOfoffTheElevator + " 人尚未搭乘電梯"
  );

  console.log("====================================");
}
//--------------------------------partB電梯更新資訊結束------------------------------

function partBPassengerGetIntoTheElevator() {
  //繪製電梯旁乘客進入左邊電梯，讓電梯人數++

  if (PartBElevatorInfo.currentPeople == 1) {
    // console.log("重新繪製電梯內人數，目前1人");

    PartBctx.drawImage(
      onePerson,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 40,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBElevatorInfo.currentPeople == 2) {
    //console.log("重新繪製電梯內人數，目前2人");

    PartBctx.drawImage(
      twoPeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 40,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBElevatorInfo.currentPeople == 3) {
    //console.log("重新繪製電梯內人數，目前3人");

    PartBctx.drawImage(
      threePeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 40,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBElevatorInfo.currentPeople == 4) {
    //console.log("重新繪製電梯內人數，目前4人");

    PartBctx.drawImage(
      fourPeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 40,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBElevatorInfo.currentPeople == 5) {
    //console.log("重新繪製電梯內人數，目前5人");

    PartBctx.drawImage(
      fivePeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 40,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBElevatorInfo.currentPeople == 6) {
    //console.log("重新繪製電梯內人數，目前6人");

    PartBctx.drawImage(
      sixpeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 40,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBElevatorInfo.currentPeople == 7) {
    //console.log("重新繪製電梯內人數，目前7人");

    PartBctx.drawImage(
      sevenpeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 40,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  }
  //繪製完電梯內乘客後，更新電梯外人數
  let PartBFloors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < PartBPeopleInfo.length; i++) {
    if (PartBPeopleInfo[i].status == "offTheElevator") {
      switch (PartBPeopleInfo[i].In) {
        case 0:
          PartBFloors[0]++;
          break;
        case 1:
          PartBFloors[1]++;
          break;
        case 2:
          PartBFloors[2]++;
          break;
        case 3:
          PartBFloors[3]++;
          break;
        case 4:
          PartBFloors[4]++;
          break;
        case 5:
          PartBFloors[5]++;
          break;
        case 6:
          PartBFloors[6]++;
          break;
        case 7:
          PartBFloors[7]++;
          break;
        case 8:
          PartBFloors[8]++;
          break;
        case 9:
          PartBFloors[9]++;
          break;
      }
    }
  }

  for (let i = 0; i < PartBFloors.length; i++) {
    if (PartBFloors[i] == 0) {
      PartBctx.fillStyle = "lightcyan";
      PartBctx.fillRect(40, 570 - i * 60, 30, 30);
    } else if (PartBFloors[i] == 1) {
      //console.log("重新繪製" + i + "樓電梯旁人數，剩餘人數 1 ..");

      PartBctx.drawImage(onePerson, 40, 570 - i * 60, 30, 30);
    } else if (PartBFloors[i] == 2) {
      PartBctx.drawImage(twoPeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 2 ..");
    } else if (PartBFloors[i] == 3) {
      PartBctx.drawImage(threePeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 3 ..");
    } else if (PartBFloors[i] == 4) {
      PartBctx.drawImage(fourPeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 4 ..");
    } else if (PartBFloors[i] == 5) {
      PartBctx.drawImage(fivePeople, 40, 570 - i * 60, 30, 30);
      //console.log("重新繪製" + Floors[i] + "樓電梯旁人數，剩餘人數 5 ..");
    }
  }
}

function partBPassengerGetOutTheElevator() {
  //繪製剩餘在左邊電梯內人數;
  if (PartBElevatorInfo.currentPeople == 0) {
    PartBctx.drawImage(
      zero,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 40,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBElevatorInfo.currentPeople == 1) {
    PartBctx.drawImage(
      onePerson,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 40,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBElevatorInfo.currentPeople == 2) {
    PartBctx.drawImage(
      twoPeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 40,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBElevatorInfo.currentPeople == 3) {
    PartBctx.drawImage(
      threePeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 40,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBElevatorInfo.currentPeople == 4) {
    PartBctx.drawImage(
      fourPeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 40,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBElevatorInfo.currentPeople == 5) {
    PartBctx.drawImage(
      fivePeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 40,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  }
  //  //繪製partB電梯左邊顯示離開的人數

  if (PartBNumberOfPassengerGetOutTheElevator == 1) {
    PartBctx.drawImage(
      onePerson,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 140,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBNumberOfPassengerGetOutTheElevator == 2) {
    PartBctx.drawImage(
      twoPeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 140,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBNumberOfPassengerGetOutTheElevator == 3) {
    PartBctx.drawImage(
      threePeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 140,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBNumberOfPassengerGetOutTheElevator == 4) {
    PartBctx.drawImage(
      fourPeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 140,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  } else if (PartBNumberOfPassengerGetOutTheElevator == 5) {
    PartBctx.drawImage(
      fivePeople,
      PartBElevator[PartBElevatorInfo.currentFloor].x + 140,
      PartBElevator[PartBElevatorInfo.currentFloor].y + 10,
      30,
      30
    );
  }
  PartBNumberOfPassengerGetOutTheElevator = 0;

  clearInterval(PartBDrawPassengerGetOutTheElevator);
}

let PartBElevatorStart = setInterval(PartBDraw, 1000);

let partBPause = false;
const partBcancelButton = document.getElementById("partBToggleButton");
partBcancelButton.addEventListener("click", () => {
  partBPause = !partBPause;
  if (partBPause == true) {
    console.log("暫停動畫");
    clearInterval(PartBElevatorStart);
  } else if (partBPause == false) {
    console.log("繼續動畫");

    PartBElevatorStart = setInterval(PartBDraw, 1000);
  }
});

//--------------------------------------------------------------------------------------------------------
//---------------------------------PART B 比較是否上下去接乘客結束---------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
