#include <iostream>
#include <vector>

using namespace std;

void	change(vector<vector<int>> &answer, int r, int c, int color, int orig_color)
{
	int row, column;
	int	backup;

	row = answer.size();
	column = answer[0].size();
	if (r < 0 || c < 0 || r >= row || c >= column)
		return ;
	backup = answer[r][c];
	if (backup == orig_color)
	{
		answer[r][c] = color;
		for (int i = -1; i < 2; i++)
		{
			for (int j = -1; j < 2; j++)
			{
				change(answer, r + i, c + j, color, orig_color);
			}
		}
	}

}

vector<vector<int>> solution(vector<vector<int>> map, vector<vector<int>> fill)
{
	vector<vector<int>> answer;

	answer = map;
	for (int i = 0; i < fill.size(); i++)
	{
		change(answer, fill[i][0] - 1, fill[i][1] - 1, fill[i][2], answer[fill[i][0] - 1][fill[i][1] - 1]);
	}
	return (answer);
}

void	print(vector<vector<int>> &map)
{
	for (int i = 0; i < map.size(); i++)
	{
		for (int j = 0; j < map[i].size(); j++)
		{
			cout << map[i][j] << " ";
		}
		cout << "\n";
	}
}

int main(void)
{
	 vector<vector<int>> map
    {
        {1, 1, 1, 1},
        {3, 2, 2, 1},
        {3, 3, 3, 4},		
        {3, 3, 3, 4}		
    };

	vector<vector<int>> fill
	{
		{2, 2, 1},
		{2, 3, 5},
		{3, 1, 5},
		{1, 1, 2}
	};

	vector<vector<int>> answer;

	answer = solution(map, fill);
	print(answer);

	return (0);
}