// 오큰수 : 스택
#include <iostream>
#include <stack>
#include <vector>
#include <string.h>

using namespace std;

int main() {
	int 		count;
	vector<int>	input;
	stack<int>	st;

	cin >> count;
	for (int i = 0; i < count; i++) {
		int parsed;
		cin >> parsed;
		input.push_back(parsed);
	}

	int	answer[count];

	memset(answer, -1, sizeof(answer));
	for (int i = count - 1; i >= 0; i--) {
		int curr = input[i];
		// curr > stack.top : curr < stack.top 일 때까지 pop
		// e.g. 9, [8, 4, 5]
		while (!st.empty() && curr >= st.top()) {
			st.pop();
		}
		// curr < stack.top : stack.top을 저장
		// e.g. 2, [7]
		answer[i] = st.empty() ? -1 : st.top();
		st.push(curr);
	}
	for (int elem : answer) {
		cout << elem << " ";
	}
}

// 현재 값 curr에서, 스택에서 가장 먼저 나오는 curr보다 큰 값을 선택
// stack pop한 값을 다시 넣어주지 않아도 되는 이유?
// 스택 상에서 더 아래에 있는 값은 위에 있는 값에 의해 선택될 경우가 없기 때문에 버려도 됨
// 즉, 스택은 스택 아래(큰 값) -> 위(작은 값) 순서로 정렬됨

// 1. 오른쪽에 있는 값만 고려하기 때문에, 스택을 이용하고 오른쪽에서 접근
// 2. 큰 수 뒤에 있는 작은 수는 고려할 필요가 없기 때문에, 중복으로 pop을 하지 않아도 되고 시간 복잡도를 줄일 수 있음