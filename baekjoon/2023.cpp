// 신기한 소수: 소수, 백트래킹
#include <iostream>
#include <vector>
#include <sstream>
#include <cmath>

using namespace std;

string	makeString(vector<int> &visited) {
	stringstream ss;
	string ans;

	for (int i = 0; i < visited.size(); i++) {
		ss << visited[i];
	}

	ss >> ans;

	return ans;
}

bool checkPrime(vector<int> &visited) {
	string ans = makeString(visited);
	int target = atoi(ans.c_str());
	int root = sqrt(target);
	bool flag = false;
	for (int i = 2; i <= root; i++) {
		if (!(target % i)) {
			flag = true;
			break;
		}
	}

	return flag ? false : true;

}

void recur(int n, vector<int> &visited, vector<bool> &prime, vector<string> &answer) {
	if (!checkPrime(visited)) {
		return;
	}
	if (visited.size() && !prime[visited[0]]) {
		return;
	}
	if (visited.size() == n) {
		string ans = makeString(visited);

		answer.push_back(ans);
		return;
	}
	for (int i = 0; i <= 9; i++) {
		visited.push_back(i);
		recur(n, visited, prime, answer);
		visited.pop_back();
	}
}

int main(void) {
	int n;
	vector<string> answer(0);
	vector<int> visited(0);
	vector<bool> prime(10, false);

	prime[2] = true;
	prime[3] = true;
	prime[5] = true;
	prime[7] = true;
	cin >> n;
	recur(n, visited, prime, answer);

	for (int i = 0; i < answer.size(); i++) {
		cout << answer[i] << endl;
	}
	
	return 0;
}