#include <iostream>
#include <sstream>
#include <string>
#include <vector>

using namespace std;

bool	check_repeat(vector<int> &v, int target) {
	for (int i = 0; i < v.size(); i++)
		if (v[i] == target)
			return true;
	return false;
}

void	dfs(int n, int m, int depth, vector<int> &v)
{
	if (depth == m)
	{
		for (int i = 0; i < v.size(); i++)
			cout << v[i] << " ";
		cout << "\n";
		return;	
	}

	for (int i = 1; i <= n; i++)
	{
		if (check_repeat(v, i))	continue;
		v.push_back(i);
		dfs(n, m, depth + 1, v);
		v.pop_back();
	}
}

int	main(void)
{
	cin.tie(NULL);
	ios::sync_with_stdio(false);

	stringstream	ss;
	string			input;
	int				n;
	int				m;
	vector<int>		v;

	getline(cin, input);
	ss << input;
	ss >> n >> m;

	dfs(n, m, 0, v);
}