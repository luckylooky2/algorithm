# 덩치 크기 비교 : 브루트 포스

# data = []
# people = int(input())
# for i in range(0, people):
# 	data.append(input().split(' '))
# 	data[i].append(1)
# 	for j in range(0, i):
# 		if data[i][0] > data[j][0] and data[i][1] > data[j][1]:
# 			data[j][2] += 1
# 		elif data[i][0] < data[j][0] and data[i][1] < data[j][1]:
# 			data[i][2] += 1

# for person in data:
# 	print(person[2], end=" ")


N = int(input()) #전체 사람 수
people = [] #사람 정보를 받을 list
for _ in range(N): #입력한 순서대로 정보를 입력받는다.
	x, y = map(int, input().split())
	people.append((x,y))
	
for i in people: 
	rank = 1 #초기값은 전부 1 
	for j in people: 
		if i[0] < j[0] and i[1] < j[1]: #조건 
			rank+=1 #조건 만족 시 count up 
	print(rank, end = " ") #바로 출력

# 10
# 55 185
# 57 165
# 56 167
# 40 175
# 42 172
# 54 140
# 75 179
# 65 125
# 69 175
# 54 140
