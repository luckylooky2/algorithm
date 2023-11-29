// 절대값 힙 : 힙, 우선순위 큐
#include <iostream>
#include <queue>

using namespace std;

class cmp {
public:
	bool operator() (int a, int b) {
		// a가 크다면 true(1), b가 크다면 false(0)
		if (abs(a) != abs(b)) return abs(a) > abs(b);
		// 절대값이 똑같다면, 음수를 위로 올려야 함
		// 3, 3 : false
		// 3, -3 : true
		// -3, 3 : false
		// -3, -3 : false
		return a > 0 && b < 0;
	}
};

int	main() {
	cin.tie(0);
	ios::sync_with_stdio(0);
	priority_queue<int, vector<int>, cmp>	pq;

	int n;
	cin >> n;
	while (n--) {
		int value;
		cin >> value;
		if (value == 0) {
			// 출력 및 제거
			if (pq.empty()) cout << "0\n";
			else {
				cout << pq.top() << "\n";
				pq.pop();
			}
		} else
			pq.push(value);
	}
}