# 영화감독 숌 : 브루트 포스

list_num = [0] # 변수명 list라고 짓지 않기

def check_continuous(list):
	i = 0
	if len(list) < 3:
		return 0
	while (i < len(list) - 2):
		if list[i] == '6':
			if list[i + 1] == '6':
				if list[i + 2] == '6':
					return 1
		i += 1
	return 0

N = int(input())

for i in range(3000000):
	tmp = list(str(i))
	if (check_continuous(tmp) == 1): # if "666" in str(i): 이걸로 대체
		list_num.append(i)
	
print(list_num[N])
