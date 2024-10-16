---
title: java常见集合汇总
tags: java
categories: java
description: java常见集合汇总
abbrlink: 42389
date: 2020-02-27 16:47:06
---

<!--more-->

{% code %}
package _27javacollect;

import java.time.DayOfWeek;
import java.util.*;

class Student {
    public String name;
    public int score;

    public Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
}
class UserComparator implements Comparator<User></User> {
    public int compare(User u1, User u2) {
        if (u1.number.charAt(0) == u2.number.charAt(0)) {
            // 如果两人的号都是A开头或者都是V开头,比较号的大小:
            return u1.number.compareTo(u2.number);
        }
        if (u1.number.charAt(0) == 'V') {
            // u1的号码是V开头,优先级高:
            return -1;
        } else {
            return 1;
        }
    }
}

class User {
    public final String name;
    public final String number;

    public User(String name, String number) {
        this.name = name;
        this.number = number;
    }

    public String toString() {
        return name + "/" + number;
    }
}


public class List_exe {

    public static void main(String[] args) {
        /** 使用List*/
        List<String> list = new ArrayList<>();
        list.add("apple");
        list.add("pear");
        list.add("apple");
        list.add(null);
        System.out.println(list);

        // 迭代器遍历list
        for(Iterator<String> it=list.iterator();it.hasNext();){
            String s = it.next();
            System.out.println("迭代器："+s);
        }
        //再次简化
        for(String s:list){
            System.out.println("简化："+s);
        }

        //list转换array，不常用
        Object[] array = list.toArray();
        for(Object o:array){
            System.out.println("list转array，不常用："+o);
        }

        //list转换array，常用
        String[] array1 = list.toArray(new String[list.size()]);
        for (String n : array1) {
            System.out.println("list转array，常用："+n);
        }

        //array变list
        Integer[] array2 = { 1, 2, 3 };
        List<Integer> list2 = Arrays.asList(array2);
        System.out.println(list2);

        /**使用map */
        Student s = new Student("Xiao Ming", 99);
        Map<String, Student> map = new HashMap<>();
        map.put("Xiao Ming", s); // 将"Xiao Ming"和Student实例映射并关联
        Student target = map.get("Xiao Ming"); // 通过key查找并返回映射的Student实例
        System.out.println(target == s); // true，同一个实例
        System.out.println(target.score); // 99
        Student another = map.get("Bob"); // 通过另一个key查找
        System.out.println(another); // 未找到返回null

        //key不能重复，value可以重复
        Map<String, Integer> map1 = new HashMap<>();
        map1.put("apple", 123);
        map1.put("pear", 123);
        System.out.println(map1.get("apple")); // 123
        map1.put("apple", 789); // 再次放入apple作为key，但value变为789
        System.out.println(map1.get("apple")); // 789

        //遍历key
        for (String key : map1.keySet()) {
            Integer value = map1.get(key);
            System.out.println(key + " = " + value);
        }
        //同时遍历key,value
        for (Map.Entry<String, Integer> entry : map1.entrySet()) {
            String key = entry.getKey();
            Integer value = entry.getValue();
            System.out.println(key + " = " + value);
        }

        /**使用EnumMap */
        Map<DayOfWeek, String> map2 = new EnumMap<>(DayOfWeek.class);
        map2.put(DayOfWeek.MONDAY, "星期一");
        map2.put(DayOfWeek.TUESDAY, "星期二");
        map2.put(DayOfWeek.WEDNESDAY, "星期三");
        map2.put(DayOfWeek.THURSDAY, "星期四");
        map2.put(DayOfWeek.FRIDAY, "星期五");
        map2.put(DayOfWeek.SATURDAY, "星期六");
        map2.put(DayOfWeek.SUNDAY, "星期日");
        System.out.println(map2);
        System.out.println(map2.get(DayOfWeek.MONDAY));

        /**使用TreeMap 对Key进行排序*/
        Map<String, Integer> map3 = new TreeMap<>();
        map3.put("orange", 1);
        map3.put("apple", 2);
        map3.put("pear", 3);
        for (String key : map3.keySet()) {
            System.out.println(key);
        }

        /**Set */
        //Set存储不重复的元素组合
        Set<String> set = new HashSet<>();
        System.out.println(set.add("abc")); // true
        System.out.println(set.add("xyz")); // true
        System.out.println(set.add("xyz")); // false，添加失败，因为元素已存在
        System.out.println(set.contains("xyz")); // true，元素存在
        System.out.println(set.contains("XYZ")); // false，元素不存在
        System.out.println(set.remove("hello")); // false，删除失败，因为元素不存在
        System.out.println(set.size()); // 2，一共两个元素

        //HashSet无序
        Set<String> set1 = new HashSet<>();
        set1.add("apple");
        set1.add("banana");
        set1.add("pear");
        set1.add("orange");
        for (String s1 : set1) {
            System.out.println("HashSet："+s1);
        }

        //TreeSet有序
        Set<String> set2 = new TreeSet<>();
        set2.add("apple");
        set2.add("banana");
        set2.add("pear");
        set2.add("orange");
        for (String s2 : set2) {
            System.out.println("TreeSet："+s2);
        }

        /**Queue*/
        Queue<String> q = new LinkedList<>();
        // 添加3个元素到队列:
        q.offer("apple");
        q.offer("pear");
        q.offer("banana");

        q.add("apple");      //添加失败抛出异常
        q.offer("apple"); //添加失败返回false
        q.remove();          //获取队首并删除失败抛出异常
        q.poll();            //获取队首并删除失败返回null
        q.element();         //获取队首不删除失败抛出异常
        q.peek();            //获取队首不删除失败返回null
        // 从队列取出元素:
        System.out.println(q.poll()); // apple
        System.out.println(q.poll()); // pear
        System.out.println(q.poll()); // banana
        System.out.println(q.poll()); // null,因为队列是空的
        // 队首永远都是apple，因为peek()不会删除它:
        System.out.println(q.peek()); // apple
        System.out.println(q.peek()); // apple
        System.out.println(q.peek()); // apple

        /**PriorityQueue 优先队列，顺序决定优先级*/
        Queue<String> q2 = new PriorityQueue<>();
        // 添加3个元素到队列:
        q2.offer("apple");
        q2.offer("pear");
        q2.offer("banana");
        System.out.println(q2.poll()); // apple
        System.out.println(q2.poll()); // banana
        System.out.println(q2.poll()); // pear
        System.out.println(q2.poll()); // null,因为队列为空


        Queue<User> q3 = new PriorityQueue<>(new UserComparator());
        // 添加3个元素到队列:
        q3.offer(new User("Bob", "A1"));
        q3.offer(new User("Alice", "A2"));
        q3.offer(new User("Boss", "V1"));
        System.out.println(q3.poll()); // Boss/V1
        System.out.println(q3.poll()); // Bob/A1
        System.out.println(q3.poll()); // Alice/A2
        System.out.println(q3.poll()); // null,因为队列为空

        /**Deque 两头进，两头出*/
        Deque<String> deque = new LinkedList<>();
        deque.addFirst("a");
        deque.addLast("a");
        deque.offerFirst("C");
        deque.offerLast("A");
        deque.getFirst();
        deque.getLast();
        deque.peekFirst();
        deque.peekLast();
        deque.removeFirst();
        deque.removeLast();
        deque.pollFirst();
        deque.pollLast();
        System.out.println(deque.pollFirst()); // C, 剩下B -> A
        System.out.println(deque.pollLast()); // B
        System.out.println(deque.pollFirst()); // A
        System.out.println(deque.pollFirst()); // null

        /**Stack*/
        /**Java中没有单独的接口，只能用Deque代替Stack，只调用push(),pop(),peek()*/
        deque.push("a");
        deque.push("c");
        System.out.println(deque.pop());
        System.out.println(deque.peek());

        /**Collections*/
        ////创建空集合
        List<String> list3 = Collections.emptyList();
        System.out.println(list3);
        ////排序
        List<String> list4 = new ArrayList<>();
        list4.add("apple");
        list4.add("pear");
        list4.add("orange");
        // 排序前:
        System.out.println(list4);
        Collections.sort(list4);
        // 排序后:
        System.out.println(list4);
        ////洗牌
        List<Integer> list5 = new ArrayList<>();
        for (int i=0; i<10; i++) {
            list5.add(i);
        }
        // 洗牌前:
        System.out.println(list5);
        Collections.shuffle(list5);
        // 洗牌后:
        System.out.println(list5);
        ////不可变集合
        List<String> mutable = new ArrayList<>();
        mutable.add("apple");
        mutable.add("pear");
        // 变为不可变集合:
        List<String> immutable = Collections.unmodifiableList(mutable);
        mutable.add("orange");
        try{
            immutable.add("orange"); // UnsupportedOperationException!
        }
        catch (UnsupportedOperationException u){
            System.out.println(u);
        }
        System.out.println(immutable);
    }
}
{% endcode %}