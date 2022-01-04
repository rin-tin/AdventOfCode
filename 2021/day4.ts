// challenge from https://adventofcode.com/2021/day/4

class Board {
    readonly nums: number[];
    readonly width: number;
    called: number[];
    lastCalled: number;
    
    constructor(input: string) {
        const srows = input.split("\n").map(s => s.split(" ").filter(s => s.length > 0));

        this.width = srows.length;
        if (srows.length !== srows[0].length) {
            throw("not square input");
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
                return true;
            } 
            if (this.checkCol(i)) {
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
            if(startNum +i !== this.called[startIndex +i]) {
                return false;
            }
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


export function part1(data: Readonly<string[]>) {
    const input = data[0].split(",").map(s => Number(s));
    const boards = data.slice(1).map(s => new Board(s));
    
    for(const num of input) {
        for(const board of boards ) {
            board.mark(num);
            if(board.check()){
                console.log("part1: first winner score ", board.calcScore());
                return;
            }
        }
    }

    console.log("part1: cannot determine winner");
}


export function part2(data: Readonly<string[]>) {
    const input = data[0].split(",").map(s => Number(s));
    let boards = data.slice(1).map(s => new Board(s));

    for(const num of input) {
        const remove: number[] = [];
        
        for(let b = 0; b < boards.length; b++) {
            const board = boards[b];

            board.mark(num);
            if(board.check()){
                remove.push(b);
            }
        }
        const bs = boards.filter((_, bi) => !remove.includes(bi));

        if(bs.length === 0) {
            // no clear logic for choosing when more than 1 board finishes 'last' simultaneously
            // arbitrarily chose first in array as provided correct result in challenge
            console.log("part2: last winner score ", boards[remove[0]].calcScore());
            return;
        }
        boards = bs;
    }

    console.log("part2: cannot determine winner");
}


// run
const data = (await Deno.readTextFile("inputs/day4.txt"))?.split("\n\n");

part1(data);
part2(data);