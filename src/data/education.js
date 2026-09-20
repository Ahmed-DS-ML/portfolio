export const education = [
  {
    id: 'masters',
    title: { en: "Master's in Data Science", ar: 'ماجستير في علم البيانات' },
    org: {
      en: 'Faculty of Graduate Studies for Statistical Research — Cairo University',
      ar: 'كلية الدراسات العليا للبحوث الإحصائية — جامعة القاهرة',
    },
    dates: { en: 'Sep 2025 — Present', ar: 'سبتمبر 2025 — الآن' },
    note: { en: 'Academic Data Science', ar: 'علم بيانات أكاديمي' },
    research: {
      title: {
        en: 'Agentic Systems and Retrieval-Augmented Generation',
        ar: 'الأنظمة الوكيلة والتوليد المعزّز بالاسترجاع',
      },
      status: { en: 'Planned thesis', ar: 'رسالة مخطط لها' },
      blurb: {
        en: 'Grounded agents that retrieve, reason, and act — aligned with product and industrial systems already shipped (TINDA / Metron), not a generic LLM essay.',
        ar: 'وكلاء مؤسسّون على الاسترجاع والاستدلال والفعل — متوافقون مع أنظمة المنتج والتصنيع التي شُحنت فعلياً (تيندا / ميترون)، لا مقالاً عاماً عن النماذج اللغوية.',
      },
    },
    featured: [
      {
        code: 'DS610',
        kind: 'core',
        title: { en: 'Advanced Machine Learning', ar: 'تعلم آلة متقدم' },
        blurb: {
          en: 'Statistical ML, neural nets, kernels, clustering, and the basics of reinforcement learning.',
          ar: 'تعلم آلة إحصائي، شبكات عصبية، نوى، تجميع، وأساسيات التعلم المعزّز.',
        },
      },
      {
        code: 'DS620',
        kind: 'core',
        title: { en: 'Introduction to Deep Neural Nets', ar: 'مقدمة في الشبكات العصبية العميقة' },
        blurb: {
          en: 'Multilayer nets, backprop, regularization, and practice in TensorFlow, Keras, and Torch.',
          ar: 'شبكات متعددة الطبقات، الانتشار العكسي، التنظيم، وتطبيق عملي على TensorFlow وKeras وTorch.',
        },
      },
      {
        code: 'DS615',
        kind: 'core',
        title: { en: 'Data Science and Decision Support Systems', ar: 'علم البيانات ونظم دعم القرار' },
        blurb: {
          en: 'Using organizational data assets so data-science findings actually change business decisions.',
          ar: 'استخدام أصول البيانات في المؤسسة حتى تغيّر نتائج علم البيانات قرارات العمل فعلياً.',
        },
      },
      {
        code: 'DS698',
        kind: 'core',
        title: {
          en: 'Ethics for Data Science and Scientific Research preparation',
          ar: 'أخلاقيات علم البيانات وإعداد البحث العلمي',
        },
        blurb: {
          en: 'Privacy, integrity, and research ethics — the gate before a master’s project and thesis.',
          ar: 'الخصوصية والنزاهة وأخلاقيات البحث — بوابة مشروع الماجستير والرسالة.',
        },
      },
      {
        code: 'DS699',
        kind: 'core',
        title: { en: 'Project', ar: 'مشروع' },
        blurb: {
          en: 'Applied capstone after DS698: real data, a real problem, and a full analytic path.',
          ar: 'مشروع تطبيقي بعد DS698: بيانات حقيقية، مسألة حقيقية، ومسار تحليلي كامل.',
        },
      },
      {
        code: 'DS616',
        kind: 'elective',
        title: { en: 'Advanced Programming in Python', ar: 'برمجة متقدمة ببايثون' },
        blurb: {
          en: 'Parallel and GPU Python, plus Hadoop and Spark for large-scale analysis — intended elective.',
          ar: 'بايثون للتوازي ووحدات الرسوم، مع Hadoop وSpark للتحليل واسع النطاق — مادة اختيارية مخططة.',
        },
      },
      {
        code: 'DS618',
        kind: 'elective',
        title: { en: 'Advanced Deep Learning', ar: 'تعلم عميق متقدم' },
        blurb: {
          en: 'CNNs, RNN/LSTM, autoencoders, and deep RL — intended elective for the agentic track.',
          ar: 'شبكات التفاف، RNN/LSTM، مشفّرات ذاتية، وتعلم معزّز عميق — اختيارية مخططة لمسار الوكلاء.',
        },
      },
      {
        code: 'DS612',
        kind: 'elective',
        title: { en: 'Advanced Database Systems', ar: 'نظم قواعد بيانات متقدمة' },
        blurb: {
          en: 'Warehouses and complex/e-commerce data stores — the retrieval layer behind RAG. Intended elective.',
          ar: 'مستودعات وبيانات تجارة معقّدة — طبقة الاسترجاع خلف RAG. مادة اختيارية مخططة.',
        },
      },
    ],
  },
  {
    id: 'diploma',
    title: { en: 'Diploma in Academic Data Science', ar: 'دبلوم علم البيانات الأكاديمي' },
    org: {
      en: 'Faculty of Graduate Studies for Statistical Research — Cairo University',
      ar: 'كلية الدراسات العليا للبحوث الإحصائية — جامعة القاهرة',
    },
    dates: { en: 'Jan 2023 — Jan 2025', ar: 'يناير 2023 — يناير 2025' },
    note: { en: 'Academic Data Science', ar: 'علم بيانات أكاديمي' },
    featured: [
      {
        code: 'DS510',
        kind: 'core',
        title: { en: 'Artificial Intelligence', ar: 'ذكاء اصطناعي' },
        blurb: {
          en: 'Design of intelligent systems across diagnosis, language, vision, and decision models.',
          ar: 'تصميم أنظمة ذكية عبر التشخيص واللغة والرؤية ونماذج القرار.',
        },
      },
      {
        code: 'DS515',
        kind: 'core',
        title: { en: 'Introduction to Data Mining', ar: 'مقدمة في تنقيب البيانات' },
        blurb: {
          en: 'Warehousing, classification, clustering, and mining on real datasets.',
          ar: 'مستودعات، تصنيف، تجميع، وتنقيب على بيانات حقيقية.',
        },
      },
      {
        code: 'DS540',
        kind: 'core',
        title: { en: 'Practical Machine Learning', ar: 'تعلم آلة تطبيقي' },
        blurb: {
          en: 'Classification, kernels, sequential and graph data, and the practical side of ML.',
          ar: 'تصنيف، نوى، بيانات تسلسلية ورسوم، والجانب العملي لتعلم الآلة.',
        },
      },
      {
        code: 'DS545',
        kind: 'core',
        title: { en: 'Introduction to Big Data Technologies', ar: 'مقدمة في تقنيات البيانات الضخمة' },
        blurb: {
          en: 'Hadoop and MapReduce from collection and storage through analysis and reporting.',
          ar: 'Hadoop وMapReduce من الجمع والتخزين حتى التحليل والتقارير.',
        },
      },
      {
        code: 'DS550',
        kind: 'core',
        title: { en: 'Fundamentals of Data Science', ar: 'أساسيات علم البيانات' },
        blurb: {
          en: 'R, preparation, analysis, visualization, and the ethical issues around data work.',
          ar: 'R، التجهيز، التحليل، التصور، والقضايا الأخلاقية حول العمل بالبيانات.',
        },
      },
      {
        code: 'DS535',
        kind: 'core',
        title: {
          en: 'Decision Support Systems and Business Intelligence',
          ar: 'نظم دعم القرار وذكاء الأعمال',
        },
        blurb: {
          en: 'Data-, model-, and knowledge-driven DSS, plus BI planning in a real managerial setting.',
          ar: 'نظم دعم قرار مدفوعة بالبيانات والنماذج والمعرفة، مع تخطيط ذكاء الأعمال في بيئة إدارية حقيقية.',
        },
      },
      {
        code: 'DS599',
        kind: 'core',
        title: { en: 'Capstone Project', ar: 'مشروع التخرج' },
        blurb: {
          en: 'End-to-end real-world data project: collect, process, analyze, and present.',
          ar: 'مشروع بيانات واقعي من الطرف إلى الطرف: جمع، معالجة، تحليل، وعرض.',
        },
      },
    ],
  },
  {
    id: 'bachelor',
    title: { en: 'Bachelor of Agricultural Engineering', ar: 'بكالوريوس الهندسة الزراعية' },
    org: { en: 'Ain Shams University', ar: 'جامعة عين شمس' },
    dates: { en: 'Sep 2015 — Jun 2019', ar: 'سبتمبر 2015 — يونيو 2019' },
    note: {
      en: 'Major in Power and Machinery Engineering (Mechanical Engineering)',
      ar: 'تخصص هندسة القوى والآلات (هندسة ميكانيكية)',
    },
  },
];

export const certifications = [
  { en: 'Google Analytics Certification', ar: 'شهادة Google Analytics' },
  { en: 'Data Analyst with Python (DataCamp)', ar: 'محلل بيانات ببايثون (DataCamp)' },
  { en: 'Google Professional Certification — Data Analytics and Machine Learning', ar: 'شهادة Google المهنية — تحليلات البيانات وتعلم الآلة' },
];
