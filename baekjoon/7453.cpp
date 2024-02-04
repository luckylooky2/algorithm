// 합이 0인 네 정수 : 이분 탐색, 정렬, 투 포인터
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int binary_search(int start, int end, int target, vector<int> &arr) {
 if (start == end) {
	return start;
 }

 int mid = (start + end) / 2;
 if (arr[mid] < target) {
	return binary_search(mid + 1, end, target, arr);
  } else {
	return binary_search(start, mid, target, arr);
  }
}

// 이분 탐색으로 구현
int lower_bound(int target, vector<int>& arr) {
	// arr.size() - 1로 하면 연속된 수가 마지막 인덱스로 끝날 때를 처리하지 못함
	// e.g. [1, 2, 3, 3]
	// lower_bound() => output(3), expected(4)
	return binary_search(0, arr.size(), target, arr);
}

int main() {
	cin.tie(NULL);
	ios::sync_with_stdio(0);
	int n;
	cin >> n;
	long long answer = 0;

	vector<vector<int> > arr;

	for (int i = 0; i < 4; i++) {
		vector<int> tmp;
		arr.push_back(tmp);
	}

	for (int i = 0; i < n; i++) {
		for (int j = 0; j < 4; j++) {
			int tmp;
			cin >> tmp;
			arr[j].push_back(tmp);
		}
	}

	for (int i = 0; i < 4; i++) {
		sort(arr[i].begin(), arr[i].end());
	}

	vector<int>		arrayToSearch;

	for (int i = 0; i < n; i++) {
		int prev = arr[2][i];
		for (int j = 0; j < n; j++) {
			arrayToSearch.push_back(prev + arr[3][j]);
		}
	}
	sort(arrayToSearch.begin(), arrayToSearch.end());

	for (int i = 0; i < n; i++) {
		int prev = arr[0][i];
		for (int j = 0; j < n; j++) {
			int curr = prev + arr[1][j];
			int negative = -1 * curr;
			int startIndex = lower_bound(negative, arrayToSearch);
			int endIndex = lower_bound(negative + 1, arrayToSearch);
			answer += endIndex - startIndex;
		}
	}
	cout << answer;
}

// 1. 접근 방법
// 1) brute force : O(n^4) => 시간 초과
// 2) 3개를 고르고, 마지막 한 개를 이분 탐색 : O(n^3) * O(logN) => 시간 초과
// 3) 2개를 고르고, 나머지 2개를 합쳐서 이분 탐색 : O(n^2) * O(logN)
// 합친 배열을 저장하는 방법?
// 3-1) 중복을 허용하지 않는 배열 : [[1, 1], [2, 2], [3, 2], [4, 1]]
// - 해시 테이블(Object)을 사용하거나 맵(Map)을 사용 => 시간 초과
// - why?
// - 해시 테이블은 해시 충돌이 발생하면 시간 복잡도가 상승 => 불리한 테스트 케이스 포함
// - 멀티셋은 중복의 개수를 세는 과정(map.count 또는 직접 카운트)에서 시간 복잡도가 상승
// - 중복 시작 지점과 중복 끝 지점을 각각 구해서 빼야 하는데 맵에서는 뺄셈 연산을 지원하지 않음, 카운트하는데 선형 시간 복잡도 소요
// - 카운트를 값으로 사용하는 맵도 마찬가지인가?
// 3-2) 중복을 허용하는 배열 : [1, 2, 2, 3, 3, 4]
// - 배열을 이용하면 뺄셈 연산이 가능 => 상수 시간 복잡도 안에 해결 가능
// - 배열을 맵처럼 이용하기 위해서는 "이분 탐색"을 통해 중복 시작 지점과 끝 지점을 구해야 함
// - lower_bound()를 이용하여 구한 인덱스 차이를 빼서 계산

// 2. 메모리 초과
// - 합친 배열 말고 또 다른 자료 구조를 사용하면 메모리 초과가 발생
// - 합친 배열도 매우 큰데(최대 원소 16M 개), 다른 자료 구조도 합친 배열만큼이나 크다

// 3. 입력 시간 초과
// - 입력 시간이 이 문제에서는 매우 크다
// - c++ : 공백이나 개행이 나올 때, cin을 계속해서 호출하기 때문에 => 시간 초과가 12초인 이유인 듯?
// - 직접 파싱하면 조금 빨라질 수도 있을 것 같지만 난이도가 상승
// - 그렇기 떄문에 다른 방식으로 해결해야 함

// 4. c++로 풀 때, answer은 항상 long long으로 고정하자