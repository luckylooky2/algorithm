// 합이 0 : 정렬, 이분 탐색, 투 포인터
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int binary_search(int start, int end, int target, vector<int> &arr) {
 if (start == end) {
	return start;
 }

 int mid = (start + end) / 2;
 if (arr[mid] < target) {
	return binary_search(start, mid, target, arr);
  } else {
	return binary_search(mid + 1, end, target, arr);
  }
}

int lower_bound(int target, vector<int>& arr) {
	return binary_search(0, arr.size(), target, arr);
}


int main() {
	cin.tie(0);
	ios::sync_with_stdio(0);
	int n;
	vector<int> students;
	int i = 0;
	int tmp;
	long long answer = 0;

	cin >> n;

	while (i < n) {
		cin >> tmp;
		students.push_back(tmp);
		i++;
	}

	sort(students.begin(), students.end());

	for (int i = 0; i < n; i++) {
		int first = students[i];
		vector<int>	restArr;
		for (int k = i + 2; k < students.size(); k++) {
			restArr.push_back(students[k]);
		}
		reverse(restArr.begin(), restArr.end());
		for (int j = i + 1; j < n - 1; j++) {
			int second = students[j];
			int sum = first + second;
			int negative = -1 * sum;
			int currIndex = lower_bound(negative, restArr);
			int nextIndex = lower_bound(negative + 1, restArr);
			if (currIndex != nextIndex) {
				answer += currIndex - nextIndex;
			}
			restArr.pop_back();
		}
	}
	cout << answer;
}

// 실수
// 1. answer : long long
// 2. vector sort 대신 reverse