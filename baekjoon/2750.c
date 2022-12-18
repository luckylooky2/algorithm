// 수 정렬하기
// 퀵 정렬

#include <stdio.h>
#include <stdlib.h>

void	swap(int first, int second, int *arr)
{
	int tmp;

	tmp = arr[second];
	arr[second] = arr[first];
	arr[first] = tmp;
}

void	quick_sort(int left, int right, int pivot, int *arr)
{
	if (left >= right)
		return ;
	int count = 0;
	int comp = right;
	int tmp;
	while (count < right - left)
	{
		if (pivot < comp) // 피벗이 왼쪽
		{
			if (arr[pivot] > arr[comp]) // 피벗이 비교 대상보다 클 때 스왑
			{
				swap(pivot, comp, arr);
				tmp = pivot;
				pivot = comp;
				comp = tmp;
				comp++;
			}
			else
				comp--;
		}
		else // 피벗이 오른쪽
		{
			if (arr[pivot] < arr[comp]) // 피벗이 비교 대상보다 작을 때 스왑
			{
				swap(pivot, comp, arr);
				tmp = pivot;
				pivot = comp;
				comp = tmp;
				comp--;
			}
			else
				comp++;
		}
		count++;
	}
	quick_sort(left, pivot - 1, left, arr);
	quick_sort(pivot + 1, right , pivot + 1, arr);
}

int main()
{
	int n;
	int *arr;
	int i;

	i = 0;
	scanf("%d", &n);

	arr = (int *)malloc(sizeof(int) * n);
	while (i < n)
	{
		scanf("%d", &arr[i]);
		i++;
	}
	quick_sort(0, n - 1, 0, arr);
	i = 0;
	while (i < n)
	{
		printf("%d\n", arr[i]);
		i++;
	}
	free(arr);
	return (0);
}