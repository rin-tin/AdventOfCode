// challenge from https://adventofcode.com/2021/day/2

const data = await Deno.readTextFile("inputs/day2.txt");

const enum Direction { Forward, Up, Down }
const dirMap = { forward: Direction.Forward, up: Direction.Up, down: Direction.Down };
const mapFn = (s: string): [Direction, number] => {
    const [dir, amp] = s.split(" ") as ["forward" | "up" | "down", string];
    return [dirMap[dir], Number(amp)];
};
const instructions = data.split("\n").map(mapFn);

export function part1(ins: [Direction, number][]): number {
    let horizontal = 0;
    let depth = 0;

    for (let i = 0; i < ins.length; i++) {
        const [dir, amp] = ins[i];

        if (dir === Direction.Forward) {
            horizontal = horizontal + amp;
        } else if (dir === Direction.Up) {
            depth = depth - amp;
        } else if (dir === Direction.Down) {
            depth = depth + amp;
        }
    }
    return horizontal * depth;
}

export function part2(ins: [Direction, number][]): number {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    for (let i = 0; i < ins.length; i++) {
        const [dir, amp] = ins[i];

        if (dir === Direction.Forward) {
            horizontal = horizontal + amp;
            depth = depth + (aim * amp);
        } else if (dir === Direction.Up) {
            aim = aim - amp;
        } else if (dir === Direction.Down) {
            aim = aim + amp;
        }
    }
    return horizontal * depth;
}

console.log("part 1", part1(instructions));
console.log("part 2", part2(instructions));
