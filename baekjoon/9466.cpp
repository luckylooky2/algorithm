// 텀 프로젝트 : 그래프, 깊이 우선 탐색, 해시를 사용한 집합과 맵
#include <vector>
#include <iostream>
#include <map>

using namespace std;

int main() {

	typedef std::vector<std::pair<int, std::vector<int> > > InputVector;

	int caseCnt;
	int i = 0;
	InputVector 		input;
	std::vector<int>	answer;

	cin >> caseCnt;

	while (i < caseCnt) {
		int j = 0;
		int studentCnt;
		std::vector<int> favoriteArr;
		cin >> studentCnt;
		while (j < studentCnt) {
			int tmp;
			cin >> tmp;
			favoriteArr.push_back(tmp);
			j++;
		}
		input.push_back(make_pair(studentCnt, favoriteArr));
		i++;
	}
	i = 0;

	while (i < caseCnt) {
		int					studentCnt = input[i].first;
		std::vector<int>	favoriteArr = input[i].second;
		std::vector<int>	result(studentCnt + 1, 0);
		for (int j = 1; j <= studentCnt; j++) {
			std::vector<int>	trace;
			std::map<int, int>	visited;
			int					traceIndex = 0;

			trace.push_back(j);
			visited[j] = traceIndex;

			while (result[j] == 0) {
				int next = favoriteArr[trace[trace.size() - 1] - 1];
				if (result[next] != 0) {
					for (int k = 0; k < trace.size(); k++) {
						result[trace[k]] = 1;
					}
					break;
				} else if (visited.find(next) != visited.end()) {
					int startIndex = visited.find(next)->second;
					for (int k = 0; k < trace.size(); k++) {
						if (k >= startIndex && k <= traceIndex) {
							result[trace[k]] = 2;
						} else {
							result[trace[k]] = 1;
						}
					}
					break;
				} else {
					trace.push_back(next);
				}
				visited[next] = ++traceIndex;
			}
		}
		int count = 0;
		for (int i = 1; i < result.size(); i++) {
			if (result[i] == 1) {
				count++;
			}
		}
		answer.push_back(count);
		i++;
	}
	for (int i = 0; i < answer.size(); i++) {
		cout << answer[i] << endl;
	}
}

// 시간 초과
// 12
// 2 3 4 5 6 7 8 9 10 10 2 2

// result[i] == 0 인지를 확인하고 trace 배열을 채워나감
// 한 번 방문한 노드는 다시 방문하지 않아야 함 => 방문하면 시간 초과가 발생
// 1. trace 배열을 처음 채울 때 result 배열을 채우기 때문에, 이 때 채워진 노드는 다시 방문하지 않음
// 2. 하지만 이전 단계에서 채워지지 않은 노드가 이미 방문한 노드를 가리키는 경우도 있음