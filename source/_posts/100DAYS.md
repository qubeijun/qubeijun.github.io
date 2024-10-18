---
title: 100DAYS
author: qubeijun
abbrlink: 20564
date: 2024-10-11 16:53:34
tags: 小组件
description: 100天100个小程序
categories: 技术
---

<div id="app">

## 1.Bin2Dec

Binary-to-Decimal number converter

<el-form ref="formItem" :model="formItem" :rules="rules" >
  <el-form-item label='Binary Input' prop="input">
    <el-input v-model="formItem.input" placeholder="Enter 0 or 1"></el-input><el-button @click="submitForm('formItem')">Convert</el-button>
  </el-form-item>
  <el-form-item label='Decimal Output'>
    <el-input v-model="formItem.output"></el-input>
  </el-form-item>
</el-form>

## 2.Border Radius Previewer

<el-main class="bordermain">
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-slider v-model="value1" class="top" @input="handleTop(value1)" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-slider v-model="value2" class="left" vertical @input="handleLeft(value2)" />
      </el-col>
      <el-col :span="8">
        <div
          ref="middle"
          :style="{ 'border-top-left-radius': borderTopLeftRadius,
                    'border-top-right-radius': borderTopRightRadius,
                    'border-bottom-right-radius': borderBottomRightRadius,
                    'border-bottom-left-radius': borderBottomLeftRadius}"
          class="middle"
        ></div>
        <!-- <div
          ref="middle"
          :style="{ 'border-radius': borderRadius}"
          class="middle"
        /> -->
      </el-col>
      <el-col :span="8">
        <el-slider v-model="value3" class="right" vertical @input="handleRight(value3)" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-slider v-model="value4" class="bottom" @input="handleBottom(value4)" />
      </el-col>
    </el-row>
  </el-main>

## 4.Christmas Lights

Simulate a string of Christm
<christmaslights></christmaslights>

 
## 6.ColorCycle

Cycle a color value through incremental changes
<colorcycle></colorcycle>
</div>
<style>
</style>
