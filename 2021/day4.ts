class Board {
    nums: number[];
    width: number;
    called: number[];
    lastCalled: number;
    
    constructor(input: string) {
        const srows = input.split("\n").map(s => s.split(" ").filter(s => s.length > 0));
        // console.log(srows);
        this.width = srows.length;
        if (srows.length !== srows[0].length) {
            throw "not square input";
        }

        this.nums = srows.flatMap(s => s.map(s => Number(s)));
        this.called = [];
        this.lastCalled = -1;
    }

    mark(n: number) {
        const pos = this.nums.findIndex(num => num === n);
        if (pos !== -1) {
            this.called.push(pos);
            this.called.sort((a, b) => a - b);
            
            this.lastCalled = n;
        }
    }

    check(): boolean {
        if (this.called.length < this.width) {
            return false;
        }
        for(let i = 0; i < this.width; i++) {
            if (this.checkRow(i)) {
                console.log("checkrow", this);
                return true;
            } 
            if (this.checkCol(i)) {
                console.log("checkcol", this);
                return true;
            } 
        }
        return false;
    }

    calcScore(): number {
        let sum = 0;
        
        for(let i = 0, j = 0; i < this.nums.length; i++) {
            const jj = this.called[j];

            if(i !== jj) {
                sum += this.nums[i];
            } else {
                j++;
            }
        }
        return sum * this.lastCalled;
    }

    private checkRow(rowNum: number): boolean {
        const startNum = (rowNum * this.width);
        
        const startIndex = this.called.findIndex(num => num === startNum);

        if (startIndex === -1 || this.called.length - startIndex < this.width) {
            return false;
        }

        for(let i = 1; i < this.width; i++) {
            if(startNum +i !== this.called[startIndex +i])
                return false;
        }   

        return true;
    }

    private checkCol(startNum: number): boolean {        
        let startIndex = this.called.findIndex(num => num === startNum);

        if (startIndex === -1 || this.called.length - startIndex < this.width) {
            return false;
        }

        for(let i = 1; i < this.width; i++) {

            const targetNum = startNum + (i * this.width);            
            const offset = this.called.slice(startIndex, startIndex + this.width).findIndex(n => n === targetNum);
    
            if(offset !== -1) {
                startIndex = startIndex + offset;
            } else {
                return false;
            }
        }   

        return true;
    }
}

async function run(){
    const data = await Deno.readTextFile("inputs/day4.txt");
    const d = data.split("\n\n");
    const input = d[0].split(",").map(s => Number(s));
    const boards = d.slice(1).map(s => new Board(s));

    for(const num of input) {
        for(const board of boards ) {
            board.mark(num);
            if(board.check()){
                console.log(board.calcScore());
                return;
            }
        }
    }
}

run();