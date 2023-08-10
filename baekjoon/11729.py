# 하노이의 탑 이동 순서 : 재귀

result = []

def hanoi(n, frm, to, aux):
    if n == 1:
        result.append((frm, to))
        return;
        
    hanoi(n-1, frm, aux, to)
    result.append((frm, to))
    hanoi(n-1, aux, to, frm)

n = int(input())
hanoi(n, 1, 3, 2)
print(len(result))
for i in result:
  print(i[0], i[1])