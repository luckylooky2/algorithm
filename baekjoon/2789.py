# 블랙잭
# 특정 수에 제일 가까운 숫자의 합 구하기(브루트 포스)

list = []
max = 0
total = 0

num, target = input().split(" ")
list = input().split(" ")
num = int(num)

for i in range(0, num):
    for j in range(i+1, num):
        for k in range(j+1, num):
            total = int(list[i]) + int(list[j]) + int(list[k])
            if (total > max and total <= int(target)):
                max = total
print(max)

