from collections import Counter
import heapq

def top_k_frequent(nums, k):
    freq = Counter(nums)
    return [item for item, _ in heapq.nlargest(k, freq.items(), key=lambda x: x[1])]

nums = [1, 1, 2, 2, 3]
k = 2
print(top_k_frequent(nums, k)) 
