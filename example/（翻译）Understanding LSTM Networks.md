---
title: （翻译）Understanding LSTM Networks
date: 2019-04-16 11:34:55
tags: RNN LSTM
categories: 
---

<!--more-->

<p>原文：<a href="http://colah.github.io/posts/2015-08-Understanding-LSTMs/">Understanding LSTM Networks</a></p>

<h2 id="recurrent-neural-networks">Recurrent Neural Networks</h2>

<p>人类不会每时每刻都开始思考。 当你阅读这篇文章时，你会根据你对之前单词的理解来理解每个单词。 你不要扔掉所有东西，然后再从头开始思考。 你的想法有持久性。</p>

<p>传统的神经网络不能做到这一点，这似乎是一个主要的缺点。 例如，假设您想要对电影中每个点发生的事件进行分类。 目前尚不清楚传统神经网络如何利用其对电影中先前事件的推理来告知后者。</p>

<p>循环神经网络解决了这个问题。 它们是带有循环的网络，允许信息持续存在。</p>

<div style="text-align:center;">
<figure class="image has"><img alt="" height="200" src="https://i-blog.csdnimg.cn/blog_migrate/012a3d7c2d42ebc05cffae2a899bf0e9.png" width="129" /><figcaption><strong>Recurrent Neural Networks have loops.</strong><br /></figcaption></figure></div>

<p>在上图中，一块神经网络A查看一些输入xt并输出一个值ht。 循环允许信息从网络的一个步骤传递到下一个步骤。</p>

<p>这些循环使得循环神经网络看起来有点神秘。 但是，如果你多想一点，事实证明它们与普通的神经网络并没有什么不同。 可以将循环神经网络视为同一网络的多个副本，每个副本都将消息传递给后继者。 考虑如果我们展开循环会发生什么：</p>

<div style="text-align:center;">
<figure class="image has"><img alt="An unrolled recurrent neural network." height="200" src="https://i-blog.csdnimg.cn/blog_migrate/1d62ac25a15756a24da75629d80bb114.png" width="761" /><figcaption><strong>An unrolled recurrent neural network.</strong></figcaption></figure></div>

<p>这种类似链的性质表明，递归神经网络与序列和列表密切相关。 它们是用于此类数据的神经网络的自然架构。</p>

<p>他们肯定会被使用！ 在过去几年中，将RNN应用于各种问题取得了令人难以置信的成功：语音识别，语言建模，翻译，图像字幕......这个列表还在继续。 我将讨论使用RNNs可以实现的惊人壮举，以及Andrej Karpathy的优秀博客文章，回归神经网络的不合理有效性。 但他们真的很棒。</p>

<p>这些成功的关键在于使用“LSTM”，这是一种非常特殊的递归神经网络，对于许多任务而言，它比标准版本好得多。 几乎所有基于递归神经网络的令人兴奋的结果都是用它们实现的。 这篇论文将探讨这些LSTM。</p>

<h2 id="the-problem-of-long-term-dependencies">The Problem of Long-Term Dependencies</h2>

<p>RNN的一个吸引力是他们可能能够将先前信息连接到当前任务，例如使用先前的视频帧可能通知对当前帧的理解。 如果RNN可以做到这一点，它们将非常有用。 但他们可以吗？ 这取决于。</p>

<p>有时，我们只需要查看最近的信息来执行当前任务。 例如，考虑一种语言模型，试图根据之前的单词预测下一个单词。 如果我们试图预测“云在天空中”的最后一个词，我们不需要任何进一步的背景 - 很明显下一个词将是天空。 在这种情况下，如果相关信息与所需信息之间的差距很小，则RNN可以学习使用过去的信息。</p>

<p style="text-align:center;"><img alt="" class="has" height="200" src="http://colah.github.io/posts/2015-08-Understanding-LSTMs/img/RNN-shorttermdepdencies.png" width="434" /></p>

<p>但也有一些情况需要更多的背景。 考虑尝试预测文本中的最后一个词“我在法国长大......我说流利的法语。”最近的信息表明，下一个词可能是一种语言的名称，但如果我们想缩小哪种语言，我们需要 从更进一步的背景来看，法国的背景。 相关信息与需要变得非常大的点之间的差距是完全可能的。</p>

<p>不幸的是，随着差距的扩大，RNN无法学习连接信息。</p>

<p style="text-align:center;"><img alt="Neural networks struggle with long term dependencies." class="has" height="200" src="https://i-blog.csdnimg.cn/blog_migrate/3e36999a908bf2a15048c704f4746e41.png" width="581" /></p>

<p>理论上，RNN绝对能够处理这种“长期依赖性”。人类可以仔细挑选参数来解决这种形式的玩具问题。 遗憾的是，在实践中，RNN似乎无法学习它们。 Hochreiter（1991）[德国]和Bengio等人对该问题进行了深入探讨（1994），他找到了一些非常根本的原因，为什么它可能很难。</p>

<p>值得庆幸的是，LSTM没有这个问题！</p>

<h2 id="lstm-networks">LSTM Networks</h2>

<p>长短期内存网络 - 通常只称为“LSTM” - 是一种特殊的RNN，能够学习长期依赖性。 它们是由Hochreiter＆Schmidhuber（1997）介绍的，并且在下面的工作中被许多人精炼和推广(1)。他们在各种各样的问题上工作得非常好，现在被广泛使用。</p>

<p>LSTM明确旨在避免长期依赖性问题。 长时间记住信息实际上是他们的默认行为，而不是他们难以学习的东西！</p>

<p>所有递归神经网络都具有神经网络重复模块链的形式。 在标准RNN中，该重复模块将具有非常简单的结构，例如单个tanh层。</p>

<div style="text-align:center;">
<figure class="image has"><img alt="" height="250" src="http://colah.github.io/posts/2015-08-Understanding-LSTMs/img/LSTM3-SimpleRNN.png" width="668" /><figcaption><strong>The repeating module in a standard RNN contains a single layer.</strong></figcaption></figure></div>

<p>LSTM也具有这种类似链的结构，但重复模块具有不同的结构。 有四个，而不是一个神经网络层，以一种非常特殊的方式进行交互。</p>

<div style="text-align:center;">
<figure class="image has"><img alt="A LSTM neural network." height="250" src="http://colah.github.io/posts/2015-08-Understanding-LSTMs/img/LSTM3-chain.png" width="665" /><figcaption><strong>The repeating module in an LSTM contains four interacting layers.</strong></figcaption></figure></div>

<p>不要担心发生了什么的细节。 我们将逐步介绍LSTM图。 现在，让我们试着对我们将要使用的符号感到满意。</p>

<p style="text-align:center;"><img alt="" class="has" height="100" src="https://i-blog.csdnimg.cn/blog_migrate/e18876e8d02e4d844323a31c7e212284.png" width="537" /></p>

<p>在上图中，每一行都携带一个整个向量，从一个节点的输出到其他节点的输入。 粉色圆圈表示逐点运算，如矢量加法，而黄色框表示神经网络层。 行合并表示连接，而行分叉表示其内容被复制，副本将转移到不同的位置。</p>

<h2 id="the-core-idea-behind-lstms">The Core Idea Behind LSTMs</h2>

<p>LSTM的关键是细胞状态，水平线贯穿图的顶部。</p>

<p>细胞状态有点像传送带。 它直接沿着整个链运行，只有一些次要的线性交互。 信息很容易沿着它不变地流动。</p>

<p style="text-align:center;"><img alt="" class="has" height="200" src="https://i-blog.csdnimg.cn/blog_migrate/e33ca72d3c13b78d681e099e8a401684.png" width="648" /></p>

<p>LSTM确实能够移除或添加信息到细胞状态，由称为门的结构精心调节。</p>

<p>门是一种可选择通过信息的方式。 它们由S形神经网络层和逐点乘法运算组成。</p>

<p style="text-align:center;"><img alt="" class="has" height="200" src="https://i-blog.csdnimg.cn/blog_migrate/1d04b4980c11c403203e440395b21337.png" width="164" /></p>

<p>sigmoid层输出0到1之间的数字，描述每个组件应该通过多少。 值为零意味着“不让任何东西通过”，而值为1则意味着“让一切都通过！”</p>

<p>LSTM具有三个这样的门，用于保护和控制细胞状态。</p>

<h2 id="step-by-step-lstm-walk-through">Step-by-Step LSTM Walk Through</h2>

<p>我们的LSTM的第一步是确定我们将从细胞状态中丢弃哪些信息。 该判定由称为“遗忘门层”的S形层决定。它查看<img alt="h_{t-1}" class="mathcode" src="https://i-blog.csdnimg.cn/blog_migrate/1aa4bed2902b60d06b05c582b2e94b5e.gif" />和<img alt="x_{t}" class="mathcode" src="https://i-blog.csdnimg.cn/blog_migrate/9d5aca6eed11efc3a6c5cd3da4154db5.gif" />，并为单元状态<img alt="C_{t-1}" class="mathcode" src="https://i-blog.csdnimg.cn/blog_migrate/dc073a60e32f12855d86ca0686da4cc2.gif" />中的每个数字输出0到1之间的数字。 1代表“完全保持这个”，而0代表“完全摆脱这个”。</p>

<p>让我们回到我们的语言模型示例，试图根据以前的所有单词预测下一个单词。 在这样的问题中，细胞状态可能包括当前受试者的性别，因此可以使用正确的代词。 当我们看到一个新主题时，我们想要忘记旧主题的性别。</p>

<p style="text-align:center;"><img alt="" class="has" height="200" src="http://colah.github.io/posts/2015-08-Understanding-LSTMs/img/LSTM3-focus-f.png" width="648" /></p>

<p>下一步是确定我们将在细胞状态中存储哪些新信息。 这有两个部分。 首先，称为“输入门层”的sigmoid层决定我们将更新哪些值。 接下来，tanh层创建可以添加到状态的新候选值<img alt="\tilde{C}_{t}" class="mathcode" src="https://i-blog.csdnimg.cn/blog_migrate/2eb9bc06e8aefd79bd04279bb1299505.gif" />的向量。 在下一步中，我们将结合这两个来创建状态更新。</p>

<p>在我们的语言模型的例子中，我们想要将新主题的性别添加到细胞状态，以替换我们忘记的旧主题。</p>

<p style="text-align:center;"><img alt="" class="has" height="200" src="https://i-blog.csdnimg.cn/blog_migrate/8c50f6ed06150f612c3a6df377a0c57e.png" width="648" /></p>

<p>现在是时候将旧的单元状态<img alt="C_{t-1}" class="mathcode" src="https://i-blog.csdnimg.cn/blog_migrate/dc073a60e32f12855d86ca0686da4cc2.gif" />更新为新的单元状态<img alt="C_{t}" class="mathcode" src="https://i-blog.csdnimg.cn/blog_migrate/dbaad608d6771d0af31b9ebbead15975.gif" />。 之前的步骤已经决定要做什么，我们只需要实际做到这一点。</p>

<p>我们将旧状态乘以<img alt="f_{t}" class="mathcode" src="https://i-blog.csdnimg.cn/blog_migrate/b307b69d7be3789549d56712d65182f9.gif" />，忘记我们之前决定忘记的事情。 然后我们添加<img alt="i_{t}*\tilde{C}_{t}" class="mathcode" src="https://i-blog.csdnimg.cn/blog_migrate/e53d30bc69c1661160886a8c115255df.gif" />。 这是新的候选值，根据我们决定更新每个状态的值来缩放。</p>

<p>在语言模型的情况下，我们实际上放弃了关于旧主题的性别的信息并添加新信息，正如我们在前面的步骤中所做的那样。</p>

<p style="text-align:center;"><img alt="" class="has" height="200" src="http://colah.github.io/posts/2015-08-Understanding-LSTMs/img/LSTM3-focus-C.png" width="648" /></p>

<p>最后，我们需要决定我们要输出的内容。 此输出将基于我们的细胞状态，但将是过滤版本。 首先，我们运行一个sigmoid层，它决定我们要输出的细胞状态的哪些部分。 然后，我们将细胞状态置于tanh（将值推到介于-1和1之间）并将其乘以sigmoid门的输出，以便我们只输出我们决定的部分。</p>

<p>对于语言模型示例，由于它只是看到一个主题，它可能想要输出与动词相关的信息，以防接下来会发生什么。 例如，它可能输出主语是单数还是复数，以便我们知道动词应该与什么形式共轭，如果接下来的话。</p>

<p style="text-align:center;"><img alt="" class="has" height="200" src="https://i-blog.csdnimg.cn/blog_migrate/41f34a70fdbc96c8d3b3d0ecf264cf44.png" width="648" /></p>

<h2 id="variants-on-long-short-term-memory">Variants on Long Short Term Memory</h2>

<p>到目前为止我所描述的是一个非常正常的LSTM。 但并非所有LSTM都与上述相同。 事实上，似乎几乎所有涉及LSTM的论文都使用略有不同的版本。 差异很小，但值得一提的是其中一些。</p>

<p>由Gers＆Schmidhuber（2000）引入的一种流行的LSTM变体是添加“窥视孔连接”。这意味着我们让栅极层看到细胞状态。</p>

<p style="text-align:center;"><img alt="" class="has" height="200" src="https://i-blog.csdnimg.cn/blog_migrate/fab76486790e9a5124c8dc61b87aecdf.png" width="648" /></p>

<p>上面的图表为所有门增加了窥视孔，但许多论文会给一些窥视孔而不是其他的。</p>

<p>另一种变化是使用耦合的遗忘和输入门。 我们不是单独决定忘记什么以及应该添加新信息，而是共同做出这些决定。 我们只会忘记当我们要在其位置输入内容时。 当我们忘记旧事物时，我们只向状态输入新值。</p>

<p style="text-align:center;"><img alt="" class="has" height="200" src="https://i-blog.csdnimg.cn/blog_migrate/80d5ec06996f1ebe68a32042fc15d0f2.png" width="648" /></p>

<p>LSTM稍微有点戏剧性的变化是由Cho等人引入的门控循环单元（GRU）。（2014）。 它将遗忘和输入门组合成一个“更新门”。它还合并了单元状态和隐藏状态，并进行了一些其他更改。 由此产生的模型比标准LSTM模型简单，并且越来越受欢迎。</p>

<p style="text-align:center;"><img alt="A gated recurrent unit neural network." class="has" height="200" src="http://colah.github.io/posts/2015-08-Understanding-LSTMs/img/LSTM3-var-GRU.png" width="648" /></p>

<p>这些只是最着名的LSTM变种中的一小部分。 还有很多其他的东西，比如Yao等人的Depth Gated RNNs（2015年）。 还有一些完全不同的解决长期依赖关系的方法，如Koutnik等人的Clockwork RNNs（2014）。</p>

<p>哪种变体最好？ 差异是否重要？ 格雷夫等人（2015）对流行的变种做了很好的比较，发现它们都差不多。 Jozefowicz，et al（2015）测试了超过一万个RNN架构，找到了一些在某些任务上比LSTM更好的架构。</p>

<h2 id="conclusion">Conclusion</h2>

<p>早些时候，我提到了人们使用RNN取得的显着成果。基本上所有这些都是使用LSTM实现的。对于大多数任务来说，它们确实工作得更好！</p>

<p>写下来作为一组方程式，LSTM看起来非常令人生畏。希望在这篇文章中逐步走过它们，使它们更加平易近人。</p>

<p>LSTM是我们通过RNN实现的重要一步。很自然地想知道：还有另一个重要的步骤吗？研究人员普遍认为：“是的！下一步是它的注意力！“我们的想法是让RNN的每一步都从一些更大的信息集中选择信息。例如，如果您使用RNN创建描述图像的标题，则可能会选择图像的一部分来查看其输出的每个单词。实际上，徐等人（2015）做到这一点 - 如果你想探索注意力，它可能是一个有趣的起点！使用注意力已经取得了许多非常令人兴奋的结果，而且似乎还有很多事情即将来临......</p>

<p>注意力不是RNN研究中唯一激动人心的线索。例如，Kalchbrenner等人的Grid LSTMs（2015）似乎非常有希望。在生成模型中使用RNN的工作 - 例如Gregor，et al（2015），Chung，et al（2015年），或Bayer＆Osendorfer（2015年）-似乎也很有趣。过去几年对于递归神经网络来说是一个激动人心的时刻，即将到来的神经网络承诺只会更加激动人心！</p>

<h2 id="acknowledgments">Acknowledgments</h2>

<p>我很感谢很多人帮助我更好地理解LSTM，评论可视化，并对这篇文章提供反馈。</p>

<p>我非常感谢Google的同事提供的有用反馈，尤其是Oriol Vinyals，Greg Corrado，Jon Shlens，Luke Vilnis和Ilya Sutskever。 我也很感谢许多其他朋友和同事花时间帮助我，包括Dario Amodei和Jacob Steinhardt。 我特别感谢Kyunghyun Cho关于我的图表的非常周到的信件。</p>

<p>在这篇文章之前，我在神经网络教授的两个研讨会系列中练习解释LSTM。 感谢所有参与这些活动的人，感谢他们对我的耐心和反馈。</p>

<p>1、除了原作者之外，很多人都对现代LSTM做出了贡献。 一份非全面的名单是：Felix Gers，Fred Cummins，Santiago Fernandez，Justin Bayer，Daan Wierstra，Julian Togelius，Faustino Gomez，Matteo Gagliolo和Alex Graves。</p>
