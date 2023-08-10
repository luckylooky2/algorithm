# 체스판 다시 칠하기 : 브루트 포스

N, M = map(int, input().split()) # 입력 개수
cb = [] # 8*8 체스판 시작점 조합
map = [] # 전체 체스판 파싱
maps = [] # 8*8 체스판 리스트
min = 32

for i in range(N):
	map.append(list(input())) # 맵 파싱

for i in range(N + 1 - 8):
	for j in range(M + 1 - 8):
		cb.append([i, j]) # 시작점 조합 구하기

for case in cb:
	cut = []
	for i in range(case[0], case[0] + 8):
		tmp = []
		for j in range(case[1], case[1] + 8):
			tmp.append(map[i][j])
		cut.append(tmp)
	maps.append(cut) # 8*8 체스판 모두 구하기

for map in maps:
	min_count = 0
	count_1 = 0
	count_2 = 0
	check = {0 : 'W', 1 : 'B'} # 'W'로 체스판이 시작하는 경우
	for i in range(8):
		for j in range(8):
			if (check[(i % 2 + j) % 2] != map[i][j]):
				count_1 += 1 # 예상 색과 다른 경우 + 1
	check = {0 : 'B', 1 : 'W'} # 'B'로 체스판이 시작하는 경우
	for i in range(8):
		for j in range(8):
			if (check[(i % 2 + j) % 2] != map[i][j]): 
				count_2 += 1 # 예상 색과 다른 경우 + 1
	if count_1 > count_2: # 둘 중 작은 수
		min_count = count_2
	else:
		min_count = count_1
	if min > min_count: # min과 비교
		min = min_count

print(min)