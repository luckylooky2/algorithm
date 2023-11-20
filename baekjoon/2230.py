from sys import stdin
input = stdin.readline

n,m = map(int,input().split())
nums = [0]*n
for i in range(n):
    nums[i] = int(input())

nums.sort()

tmp = 20000000001
for j in range(n):
    low = j
    high = n
    while(low<high):
        mid = (low + high) // 2
        if nums[mid] - nums[j]>=m:
            high = mid 
        else:
            low = mid + 1
        print(low, high, mid)
    print(mid, j);
    if high == n: break

    if tmp > nums[high]-nums[j]:
        tmp = nums[high] - nums[j] 

print(tmp)