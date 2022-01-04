const data = await Deno.readTextFile("inputs/day3.txt");

const instructions = data.split("\n");


export function countAllBits(s: string[]): number[] {
    const a: number[] = [];
    
    for (let j = 0; j < s.length; j++) {
        for (let i = 0; i < s[i].length; i++) {
            a[i] = (a[i] ?? 0) + isPos(s[j], i);
        }
    }
    return a;
}

export function isPos(s: string, pos: number): number {
    if(s.charAt(pos) === '1') {
        return 1;
    }
    return 0;
}

export function countBit(s: string[], pos: number): number {
    let a = 0;
    
    for (let i = 0; i < s.length; i++) {
        a += isPos(s[i], pos);
    }
    return a;
}

export function mostPopular(n: number[]): boolean[] {
    const b = []; 
    
    for (let i = 0; i < n.length; i++) {
        b[i] = n[i] > (instructions.length / 2);
    }
    return b;
}

export function part2(s: string[], mostCommon: boolean): string {
    const numBits = s.reduce((max: number, s: string) => Math.max(max, s.length), 0);

    // counting 1s in pos
    for (let i = 0; i < numBits; i++) {
        const tally = countBit(s, i);
        // 1 and most popular: true
        // 1 and least pop: false

        const is1 = (tally >= (s.length / 2)) === mostCommon;
        
        s = s.filter( (s: string) => Boolean(isPos(s, i)) === is1);
        
        if(s.length == 1) return s[0];
    }

    if(!s.every(v => v === s[0]) || s.length == 0) {
        throw('multiple instructions with different values remain at end of part 2 or len 0: ' + s);
    }
    
    return s[0];
}

export function toBools(s: string): boolean[] {
    const b = new Array(s.length);

    for(let i = 0; i < b.length; i++) {
        b[i] = Boolean(isPos(s, i));
    }
    return b;
}

// 0 1 1 1 0 1   ===   29

// 1 2 4 8 16 32 64 128

// Math.pow(0) == 1
// Math.pow(1) == 2
// Math.pow(2) == 4
// Math.pow(3) == 8
export function toDec(bools: boolean[]): number {
    let n = 0; 
    
    bools.reverse().forEach((b, i) => {
        if (b) {
            n += Math.pow(2, i);
        }
    });

    return n;
}

// part 1 output

console.log("counts", countAllBits(instructions));

const booleans1 : boolean[] = mostPopular(countAllBits(instructions));
console.log("1 booleans", booleans1);

const booleans2 : boolean[] = mostPopular(countAllBits(instructions)).map(b => !b)
console.log("2 booleans", booleans2);

const gamma: number = toDec(mostPopular(countAllBits(instructions)));
console.log("gamma", gamma);

const epsilon: number = toDec(mostPopular(countAllBits(instructions)).map(b => !b));
console.log("epsilon", epsilon);

const power: number = gamma * epsilon;
console.log("power", power);


// part 2 output


const oxygen = toDec(toBools(part2(instructions, true)));
console.log('oxygen', oxygen);

const c02 = toDec(toBools(part2(instructions, false)));
console.log('c02', c02);

const lifeSupport: number = oxygen * c02;
console.log("lifeSupport", lifeSupport);