// 카드2 : 스택

#include <iostream>
#include <deque>

using namespace std;

int main(void)
{
	int n;
	cin >> n;
	
	deque<int>	deq(n);

	for (int i = 0; i <= n; i++)
		deq[i] = i + 1;
	while (deq.size() != 1)
	{
		deq.pop_front();
		deq.push_back(deq.front());
		deq.pop_front();
	}
	cout << deq[0];
}
