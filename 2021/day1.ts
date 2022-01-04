const data = await Deno.readTextFile("inputs/day1.txt");
const nums = data.split("\n").map((v) => Number(v));

// part1
export function part1(nums: number[]): number {
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < nums[i + 1]) {
      count++;
    }
  }

  return count;
}

// part2
export function part2(nums: number[]): number {
  const a = new Array(nums.length - 2);

  for (let i = 0; i < nums.length - 2; i++) {
    a[i] = nums[i] + nums[i + 1] + nums[i + 2];
  }

  return part1(a);
}

console.log("part1", part1(nums));
console.log("part2", part2(nums));
