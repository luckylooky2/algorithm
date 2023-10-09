#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <cmath>

using namespace std;

int	g_curr = 0;

void	recur(int max, int startX, int startY, int r, int c) {
	if (max == 2)
	{
		for (int i = 0; i < 2; i++)
		{
			for (int j = 0; j < 2; j++)
			{
				if (startX + i == r && startY + j == c)
				{
					cout << g_curr << "\n";
					exit(0);
				}
				g_curr++;
			}
		}
		return;
	}
	
	for (int i = 0; i < 2; i++)
	{
		for (int j = 0; j < 2; j++)
		{
			if (startX + (max / 2 * i) <= r 
				&& r < startX + (max / 2 * (i + 1))
				&&  startY + (max / 2 * j) <= c
				&& c < startY + (max / 2 * (j + 1)))
				recur(max / 2, startX + (max / 2 * i), startY + (max / 2 * j), r, c);
			else
				g_curr += pow(max / 2, 2);
		}
	}
}

int		main(void)
{
	cin.tie(0);
	ios::sync_with_stdio(0);

	string			input;
	stringstream	ss;
	int				n, r, c;
	int				max;

	getline(cin, input);
	ss << input;
	ss >> n;
	ss >> r;
	ss >> c;
	max = pow(2, n);
	recur(max, 0, 0, r, c);
}