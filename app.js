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
  if (
    leftElevatorInfo.currentPeople == 0 &&
    leftElevatorInfo.basicTarget == "none"
  ) {
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
        (leftElevatorInfo.futureDirection == peopleInfo[i].direction &&
          leftElevatorInfo.direction == peopleInfo[i].direction) ||
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
  }

  numberOfPassengerGetOutTheLeftElevator = 0;

  clearInterval(drawPassengerGetOutTheLeftElevator);
}

let elevatorStart = setInterval(draw, 100);

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
  if (
    //PartAElevatorInfo.currentPeople == 0 &&
    PartAElevatorInfo.basicTarget == "none"
  ) {
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
    console.log("左邊電梯方向調整後，方向為 : " + PartAElevatorInfo.direction);

    PartAElevatorInfo.endFloor = PartAElevatorPassenger[0].Out; //將第一位的Out暫時設為最終樓層
    //如果人數大於1人，依照direction為上或下，來判斷最終樓層為多少
    if (
      PartAElevatorInfo.direction == "up" &&
      PartAElevatorInfo.currentPeople > 1
    ) {
      //電梯往上
      for (let i = 1; i < PartAElevatorPassenger.length; i++) {
        if (PartAElevatorInfo.endFloor < PartAElevatorPassenger[i].Out) {
          PartAElevatorInfo.endFloor = PartAElevatorPassenger[i].Out;
        }
      }
    } else if (
      PartAElevatorInfo.direction == "down" &&
      PartAElevatorInfo.currentPeople > 1
    ) {
      for (let i = 1; i < leftElevatorPassenger.length; i++) {
        if (PartAElevatorInfo.endFloor > PartAElevatorPassenger[i].Out) {
          PartAElevatorInfo.endFloor = PartAElevatorPassenger[i].Out;
        }
      }
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

let PartAElevatorStart = setInterval(PartADraw, 100);

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
