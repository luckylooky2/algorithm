// 이중 우선순위 큐 : 맵, 우선수위 큐
#include <iostream>
#include <string>
#include <set>

using namespace std;

int	main()
{
	cin.tie(NULL);
	ios::sync_with_stdio(0);
	int	n;

	cin >> n;
	for (int i = 0; i < n; i++) {
		std::multiset<int>	input;
		int cnt;
		cin >> cnt;
		for (int j = 0; j < cnt; j++) {
			char	cmd;
			int		value;
			cin >> cmd >> value;
			if (cmd == 'I') {
				input.insert(value);
			} else {
				if (input.size()) {
					if (value == 1) {
						int value = *input.rbegin(); 
						auto it = input.find(value);
						if (it != input.end()) {
							input.erase(it);
						}
					} else {
						int value = *input.begin(); 
						auto it = input.find(value);
						if (it != input.end()) {
							input.erase(it);
						}
					}
				}
			}
		}
		if (input.size()) {
			cout << *input.rbegin() << " " << *input.begin() << endl; // 마지막 개행 누락
		} else {
			cout << "EMPTY\n";
		}
	}
}