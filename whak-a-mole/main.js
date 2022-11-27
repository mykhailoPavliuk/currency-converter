class TableField{
    constructor(number) {
        this.number=number;
        this.field=[];
    }
    domElementCreator(){
        let table=document.createElement("table");
        for(let i=0;i<this.number;i++){
            let insideArr = [];
            let row=document.createElement("tr");
            for(let j=0;j<this.number;j++){
                const td=new TableTd(["default","bobling",'clickTrue','clickFalse']);
                td.render(row);
                insideArr.push(td);
            }
            this.field.push(insideArr);
            table.appendChild(row);
        }
        document.body.prepend(table);
    }
    // domRerender(){
    //     let insideArr = document.getElementsByTagName("tr");
    //     for(let i=0;i<insideArr.length;i++){
    //         // insideArr[i]=tr
    //         let rows=[...insideArr[i].childNodes];
    //         for(let j=0;j<rows.length;i++){
    //             let td=rows[j];
    //             // td
    //             console.log(td);
    //             td=this.field.render(rows);
    //             console.log(td);
    //         }
    //     }
    //
    // }
    randomise() {
       return Math.floor(Math.random()*(this.number));
    }
    numberise() {
        setInterval(()=> {
            let i, j;
            const insideArr = [...document.getElementsByTagName("tr")];
            do {
                i = this.randomise();
                j = this.randomise();
            } while (this.field[i][j]._state.status !== "default");
            const rows = [...insideArr[i].childNodes];
            const td = rows[j];
            const activeCell = this.field[i][j];
            const userFrags = document.querySelectorAll(`.${activeCell._stateStatus.success}`).length;
            const computerFrags = document.querySelectorAll(`.${activeCell._stateStatus.fail}`).length;
            if (userFrags < 51 && computerFrags < 51) {
            activeCell._state.status = activeCell._stateStatus.active;
            activeCell.rerender();
            let renderDate = new Date();
            td.addEventListener('click', function (e) {
                e.preventDefault();
                let clickDate = new Date();
                if (clickDate - renderDate < 3000) {
                    activeCell._state.status = activeCell._stateStatus.success;
                    activeCell.rerender();
                } else {
                    activeCell._state.status = activeCell._stateStatus.fail;
                    activeCell.rerender();
                }
            });
            td.removeEventListener("click", function (e) {
                e.preventDefault();
            });
            setTimeout(() => {
                if (activeCell._state.status !== activeCell._stateStatus.success) {
                    activeCell._state.status = activeCell._stateStatus.fail;
                    activeCell.rerender();
                }
            }, 3000)
        }if(userFrags===51){
                alert("USER WINS");
                this.clearInteval()
            }if(computerFrags===51){
                alert("COMPUTER WINS");
                this.clearInteval()
            }
            //  let tdVirtualElement = TableTd.creatorCell('td');
           //  rows[j].className=`${activeCell._state.status}`;
           //  console.log(rows[j]);
           //  console.log(tdVirtualElement);
           //  rows[j]=tdVirtualElement;
            // insideArr[i]=rows;
            // let table=document.createElement("table");
            // for(let i=0;i<insideArr.length;i++){
            //     console.log(insideArr[i]);
            // }
            // console.log(table);



        },3000)
    }
    clearInteval(){
        clearInterval(this.numberise())
    }
    // timer() {
    //     setInterval(function () {
    //        this.numberise()
    //
    // }

}

class TableTd{
    constructor(classArr){
        this._element = null;
        this._stateStatus = {
            default: classArr[0],//transparent
            active: classArr[1], //blue
            success: classArr[2],//red
            fail:classArr[3]//green
        };
        this._state = {
            status: this._stateStatus.default
        };
    }

    static creatorCell(str){
        return document.createElement(str);
    }
    render(container){
        let td=TableTd.creatorCell("td");
        td.className=`${this._state.status}`;
        this._element = td;
        container.appendChild(td);

    }
    rerender(){
        this._element.className = `${this._state.status}`;
    }
}


// const td = new TableTd(["simple-td","fd",'fsdfdsf','rfeer']);
const table=new TableField(10);
table.domElementCreator();
console.log(table);
table.numberise();
//
// function arrCreater(n, element) {
//     let arr = [];
//     for (let i = 0; i < n; i++) {
//         let insideArr = [];
//         for (let k = 0; k < n; k++) {
//             insideArr.push(element)
//         }
//         arr.push(insideArr)
//     }
//     return arr
// }
// // let suka =new TableField(10,[0]);
// // suka.arrCreator();
// //
// // console.log(suka);
//
// function randomise(max) {
//     return Math.floor(Math.random()*(max-1));
// }
//
// function numberise(field,x,y) {
//     field[x][y]=1
//     return field
// }
//
// console.log(numberise(arrCreater(10, 0), randomise(10), randomise(10)));;
