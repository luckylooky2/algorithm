// 숨바꼭질 3 : 그래프, 너비 우선 탐색, 다익스트라, 큐, 우선순위 큐
#include <iostream>
#include <deque>
#include <cstring>

using namespace std;

int	map[100001];
int dir[2] = {-1, 1};

int main() {
	int n, k;
	deque<int>	q;
	
	cin >> n >> k;
	bzero(map, sizeof(int) * 100001);
	q.push_back(n);
	map[n] = 1;

	while (!q.empty()) {
		int prev = q.front();
		q.pop_front();

		if (prev == k) {
			cout << map[prev] - 1;
			break;
		}
		// 2배 거리
		int next = prev * 2;
		if (next >= 0 && next <= 100000 && map[next] == 0) {
			map[next] = map[prev];
			q.push_front(next);
		}
		for (int i = 0; i < 2; i++) {
			next = prev + dir[i];
			if (next < 0 || next > 100000 || map[next] != 0) {
				continue;
			}
			map[next] = map[prev] + 1;
			q.push_back(next);
		}
	}
}