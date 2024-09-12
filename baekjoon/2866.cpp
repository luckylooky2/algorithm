// 문자열 잘라내기 : 문자열, 해시를 사용한 집합과 맵, 이분 탐색, 정렬
#include <iostream>
#include <vector>
#include <set>

using namespace std;

int main() {

	ios::sync_with_stdio(false);
	cin.tie(0);

	int r, c;
	cin >> r >> c;

	vector<string>	horizontal;
	vector<string>	vertical(c, "");
	
	for (int i = 0; i < r; i++) {
		string tmp;
		cin >> tmp;
		horizontal.push_back(tmp);
	}

	for (int i = 0; i < c; i++) {
		for (int j = 0; j < r; j++) {
			vertical[i] = vertical[i] + horizontal[j][i];
		}
	}


	int count = 0;
	for (; count < r - 1; count++) {
		set<string> s;
		bool flag = false;

		for (int i = 0; i < vertical.size(); i++) {
			vertical[i][count] = '0';
			if (s.find(vertical[i]) == s.end()) {
				s.insert(vertical[i]);
			} else {
				flag = true;
				break;
			}
		}
		if (flag) {
			break;
		}
	}

	cout << count;
	
	return 0;
}

// 통과(6MB, 0.9s)