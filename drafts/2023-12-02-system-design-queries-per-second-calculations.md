---
layout: post
title: "System Design: Queries Per Second Calculations"
date: '2023-12-02 10:09:18 +0530'
categories: [System Design, Interview, Performance]
tags: [QPS, Estimation, CPU, System Scalability]
math: true
---
## Problem Statement

In a system design interview, it's common to estimate the Query Per Second (QPS) to gauge the performance and scalability requirements of the system. Here, we'll explore how to approach QPS estimations with an example.

### Given Information:

- Modern server with 32 CPU cores.
- System latency should be less than 250 ms for a real-time experience.
- Daily traffic of 1 million requests.

## QPS Calculation Formula

### 1. Based on CPU Cores of System

The formula to estimate QPS is given by:

\$$ [ QPS = \frac{\text{Number of CPU Cores}}{\text{Average Time for a Request in Seconds}} ] $$

Assuming we have an average time for a request of 250 ms:

\$$ [ QPS_{\text{average}} = \frac{32}{0.25} = 128 ] $$

This implies that the system can handle an average of 128 queries per second under normal conditions. 

### 2. Based on Total Daily Queries

\$$ [ QPS_{\text{average}} = \frac{\text{Number of Daily Queries}}{\text{Seconds in a Day}} ] $$

\$$ [ QPS_{\text{average}} = \frac{1,000,000}{3600 \times 24} \approx 12 ] $$

## Peak Traffic Estimations

### 1. 10% Per Hour Rule

Assuming daily traffic is 1 million:

\$$ [ QPS_{\text{peak_10%}} = \frac{0.1 \times \text{Daily Traffic}}{\text{Seconds in an Hour}} ] $$

\$$ [ QPS_{\text{peak_10%}} = \frac{0.1 \times 1,000,000}{3600} \approx 27.78 ] $$

### 2. Peak Traffic Twice the Average Traffic

This is approx max peak traffic the system needs to handle as per the CPU formula of average 128 queries.

\$$ [ QPS_{\text{peak_twice}} = 2 \times QPS_{\text{average}} = 2 \times 128 = 256 ] $$

## Conclusion

In this example, we've calculated the average QPS and explored two different approaches for estimating peak traffic. These estimations help design a system that can handle both usual and peak loads effectively.