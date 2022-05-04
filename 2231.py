# 합성수
# 자기 자신과 각 자리수의 합이 특정 수가 되는 수 찾기(브루트 포스)

num = input()
num_digit = len(list(num))
num = int(num)
res = 0

for i in (range(0, 9 * num_digit)):
    a = num - i
    if (a < 0):
        break;
    else:
        total = a
        a_list = list(str(a))
        for i in a_list:
            total += int(i)
        if (total == num):
            res = a

print(res)
            