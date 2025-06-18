export const bigONotationQuiz = {
  id: 'big-o-mastery-quiz',
  title: 'Big O Notation Mastery Quiz',
  description: 'Test your understanding of algorithm complexity analysis across all 8 parts of the series.',
  questions: [
    {
      id: 1,
      question: 'What is the time complexity of the following code?',
      code: `function example(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}`,
      type: 'multiple-choice',
      options: [
        'O(n)',
        'O(n²)',
        'O(n log n)',
        'O(n³)'
      ],
      correct: 1,
      explanation: 'This is a nested loop where the inner loop runs (n-1) + (n-2) + ... + 1 times, which equals n(n-1)/2 = O(n²).'
    },
    {
      id: 2,
      question: 'Which complexity is better for large datasets?',
      type: 'multiple-choice',
      options: [
        'O(n²) with small constant',
        'O(n log n) with large constant',
        'It depends on the input size',
        'Both are equivalent'
      ],
      correct: 2,
      explanation: 'For small inputs, the algorithm with smaller constants may be faster regardless of Big O. For large inputs, the better asymptotic complexity (O(n log n)) will dominate.'
    },
    {
      id: 3,
      question: 'What is the space complexity of merge sort?',
      type: 'multiple-choice',
      options: [
        'O(1)',
        'O(log n)',
        'O(n)',
        'O(n log n)'
      ],
      correct: 2,
      explanation: 'Merge sort requires O(n) auxiliary space for the temporary arrays used during the merge process.'
    },
    {
      id: 4,
      question: 'Using the Master Theorem, what is the complexity of T(n) = 3T(n/2) + O(n)?',
      type: 'multiple-choice',
      options: [
        'O(n)',
        'O(n log n)',
        'O(n^1.585)',
        'O(n²)'
      ],
      correct: 2,
      explanation: 'With a=3, b=2, f(n)=O(n): c = log₂(3) ≈ 1.585. Since f(n) = O(n¹) and 1 < 1.585, this is Case 1, giving T(n) = O(n^1.585).'
    },
    {
      id: 5,
      question: 'What is the amortized time complexity of dynamic array push operations?',
      type: 'multiple-choice',
      options: [
        'O(1)',
        'O(log n)',
        'O(n)',
        'O(n²)'
      ],
      correct: 0,
      explanation: 'Although individual push operations can take O(n) time when resizing, the amortized analysis shows that the average cost per operation is O(1).'
    },
    {
      id: 6,
      question: 'Which factor does NOT significantly impact real-world performance beyond Big O?',
      type: 'multiple-choice',
      options: [
        'Cache locality',
        'Branch prediction',
        'Variable naming',
        'Memory allocation patterns'
      ],
      correct: 2,
      explanation: 'Variable naming affects code readability but has no impact on runtime performance. Cache locality, branch prediction, and memory allocation patterns all significantly affect real performance.'
    },
    {
      id: 7,
      question: 'What is the time complexity of binary search on a sorted array?',
      type: 'multiple-choice',
      options: [
        'O(1)',
        'O(log n)',
        'O(n)',
        'O(n log n)'
      ],
      correct: 1,
      explanation: 'Binary search divides the search space in half with each comparison, leading to O(log n) time complexity.'
    },
    {
      id: 8,
      question: 'In the following recursive Fibonacci implementation, what causes the exponential time complexity?',
      code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}`,
      type: 'multiple-choice',
      options: [
        'The recursive calls',
        'The base case check',
        'Overlapping subproblems',
        'The addition operation'
      ],
      correct: 2,
      explanation: 'The exponential complexity comes from repeatedly solving the same subproblems. fibonacci(n-2) is computed both in fibonacci(n-1) and fibonacci(n-2), leading to exponential growth.'
    },
    {
      id: 9,
      question: 'Which technique can transform the naive Fibonacci from O(2ⁿ) to O(n)?',
      type: 'multiple-choice',
      options: [
        'Tail recursion',
        'Memoization',
        'Loop unrolling',
        'Bit manipulation'
      ],
      correct: 1,
      explanation: 'Memoization stores previously computed results, eliminating the overlapping subproblems that cause exponential complexity.'
    },
    {
      id: 10,
      question: 'What is the space complexity of the recursive binary search?',
      type: 'multiple-choice',
      options: [
        'O(1)',
        'O(log n)',
        'O(n)',
        'O(n log n)'
      ],
      correct: 1,
      explanation: 'Each recursive call adds a frame to the call stack. Since binary search makes O(log n) recursive calls, the space complexity is O(log n).'
    },
    {
      id: 11,
      question: 'Which sorting algorithm has the best worst-case time complexity?',
      type: 'multiple-choice',
      options: [
        'Quick sort',
        'Bubble sort',
        'Merge sort',
        'Selection sort'
      ],
      correct: 2,
      explanation: 'Merge sort has O(n log n) worst-case time complexity. Quick sort can degrade to O(n²) in the worst case, while bubble sort and selection sort are O(n²).'
    },
    {
      id: 12,
      question: 'In analyzing algorithms, what does "amortized analysis" help us understand?',
      type: 'multiple-choice',
      options: [
        'Worst-case performance',
        'Best-case performance',
        'Average cost over a sequence of operations',
        'Memory usage patterns'
      ],
      correct: 2,
      explanation: 'Amortized analysis gives us the average cost per operation over a sequence of operations, which can be much better than worst-case analysis for data structures like dynamic arrays.'
    }
  ]
};
