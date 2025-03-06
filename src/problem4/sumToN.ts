/*
    From mathematic pov, there is a formula to return the sum of all the normal number from 1 to n: sum = n*(n+1)/2
    Time complexity: O(1)
    Space: O(1)
*/
function sum_to_n_a(n: number): number {
    return n * (n + 1) / 2;
}

/*
    This method will basically create a loop from 1 to n and then create a cummulative sum
    Time complexity: O(n)
    Space: O(1)
*/

function sum_to_n_b(n: number): number {
    let result: number = 0;
    for(let i = 1; i <= n; i++){
        result += i;
    }
    return result;
}

/*
    This method will return the cummulative sum by using recursive function
    Time complexity: O(n)
    Space: O(n)
*/

function sum_to_n_c(n: number): number {
    if (n === 1){
        return 1;
    }
    
    return n + sum_to_n_c(n-1);
}