#include <sstream>
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(void)
{
    stringstream    ss;
    string          input;
    int             n;
    int             value;
    vector<int>     arr;
    long long       *final[2];
    int             tmp;

	while (cin >> input)
		ss << input << '\n';
    ss >> n;
    ss >> value;
    while (ss >> tmp)
        arr.push_back(tmp);

    sort(arr.begin(), arr.end());
    
    final[0] = new long long[value + 1];
    final[1] = new long long[value + 1];

    for (int i = 0; i <= value; i++)
        final[0][i] = i % arr[0] ? 0 : 1;
    for (int i = 1; i < n; i++)
    {
        int most = arr[i];
        int prevIndex = i % 2 ? 0 : 1;
        int nextIndex = i % 2 ? 1 : 0;
        for (int j = 0; j <= value; j++)
        {
            final[nextIndex][j] =
            final[prevIndex][j] + (j - most >= 0 ? final[nextIndex][j - most] : 0);
        }
    }

    cout << final[(n - 1) % 2][value];
}