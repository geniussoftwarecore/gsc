export default function ServiceDetailClean() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { lang, dir } = useLanguage();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAppDetails, setSelectedAppDetails] = useState<AppCard | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Use the translated categories and cards
  const categories = useAppCategories();
  const appCards = useAppCards();

  // Handle deep linking with hash fragments
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#details-')) {
        const appId = hash.replace('#details-', '');
        const app = appCards.find(card => card.id === appId);
        if (app) {
          setSelectedAppDetails(app);
          setIsDetailsModalOpen(true);
        }
      } else if (isDetailsModalOpen) {
        setIsDetailsModalOpen(false);
        setSelectedAppDetails(null);
      }
    };

    // Check initial hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isDetailsModalOpen]);

  // Handle modal close - update URL hash
  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedAppDetails(null);
    // Remove hash from URL without triggering navigation
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  // Handle view details click
  const handleViewDetails = (app: AppCard) => {
    setSelectedAppDetails(app);
    setIsDetailsModalOpen(true);
    // Add hash to URL for deep linking
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#details-${app.id}`);
  };

  // App Details Modal Component
  const AppDetailsModal = () => {
    if (!selectedAppDetails || !isDetailsModalOpen) return null;

    return (
      <Dialog open={isDetailsModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent 
          className="max-w-4xl max-h-[90vh] overflow-y-auto" 
          dir={dir}
          aria-labelledby={`details-title-${selectedAppDetails.id}`}
          aria-describedby={`details-description-${selectedAppDetails.id}`}
        >
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle 
              id={`details-title-${selectedAppDetails.id}`}
              className="text-xl font-bold text-gray-900 dark:text-white pr-4"
            >
              {selectedAppDetails.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={t('mobileAppPage.details.close', 'إغلاق')}
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {/* Overview Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('mobileAppPage.details.overview', 'نظرة عامة')}</h3>
              </div>
              <p 
                id={`details-description-${selectedAppDetails.id}`}
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                {selectedAppDetails.longDesc}
              </p>
            </motion.div>

            {/* Key Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('mobileAppPage.details.keyFeatures', 'الميزات الرئيسية')}</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedAppDetails.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack & Integrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Tech Stack */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('mobileAppPage.details.stack', 'التقنيات المستخدمة')}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedAppDetails.stack.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Integrations */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Plug className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('mobileAppPage.details.integrations', 'التكاملات')}</h3>
                </div>
                <ul className="space-y-1">
                  {selectedAppDetails.integrations.map((integration, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <ChevronRight className={cn("w-4 h-4 text-gray-400", dir === 'rtl' && "rotate-180")} />
                      <span>{integration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Timeline Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('mobileAppPage.details.timeline', 'المدة المتوقعة والخط الزمني')}</h3>
              </div>
              <div className="space-y-3">
                {selectedAppDetails.timeline.map((phase, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{phase.phase}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{phase.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>


            {/* FAQs Section */}
            {selectedAppDetails.faqs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('mobileAppPage.details.faqs', 'أسئلة شائعة')}</h3>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {selectedAppDetails.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-right">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-gray-700 dark:text-gray-300">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <Button
                size="lg"
                className="flex-1"
                onClick={() => {
                  setLocation('/contact');
                  handleCloseModal();
                }}
                data-testid={`button-start-now-${selectedAppDetails.id}`}
              >
                {t('mobileAppPage.details.startNow', 'ابدأ الآن')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setLocation('/contact?service=mobile-apps');
                  handleCloseModal();
                }}
                data-testid={`button-discuss-modal-${selectedAppDetails.id}`}
              >
                {t('mobileAppPage.details.discussApp', 'ناقش التطبيق')}
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // Optimized service query
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  // Memoized service lookup
  const service = useMemo(() => {
    return services?.find(s => s.id === id);
  }, [services, id]);

  // Filter cards based on selected category
  const filteredCards = useMemo(() => {
    if (selectedCategory === 'all') {
      return appCards;
    }
    return appCards.filter(card => card.category === selectedCategory);
  }, [selectedCategory]);

  // Check if this is the mobile app development service
  const isMobileAppService = service?.id === '9ee84299-5465-49df-afe0-c6ff45a2f19c';

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800" dir={dir}>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-32 w-full mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center" dir={dir}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {lang === 'ar' ? 'الخدمة غير موجودة' : 'Service Not Found'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {lang === 'ar' ? 'عذراً، لم نتمكن من العثور على الخدمة المطلوبة' : 'Sorry, we could not find the requested service'}
          </p>
          <Button onClick={() => setLocation('/services')}>
            <ArrowLeft className={cn("w-4 h-4 mr-2", dir === 'rtl' && "rotate-180 mr-0 ml-2")} />
            {lang === 'ar' ? 'العودة للخدمات' : 'Back to Services'}
          </Button>
        </div>
      </div>
    );
  }

  // If not mobile app service, show the ERPNext section or basic service view
  if (!isMobileAppService) {
    const Icon = Smartphone; // Default icon for services
    
    return (
      <>
        <SEOHead
          title={`${service.title} - ${lang === 'ar' ? 'جينيوس سوفتوير' : 'Genius Software'}`}
          description={service.description}
          keywords={service.technologies?.join(', ')}
        />
        
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800" dir={dir}>
          
          {/* ERPNext v15 Section - Only show for ERP services */}
          {service && service.category === 'erp' && (
            <ConsolidatedERPNextV15Section />
          )}

          {/* Back Button */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                variant="ghost" 
                onClick={() => setLocation('/services')}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <ArrowLeft className={cn("w-4 h-4 mr-2", dir === 'rtl' && "rotate-180 mr-0 ml-2")} />
                {lang === 'ar' ? 'العودة للخدمات' : 'Back to Services'}
              </Button>
            </motion.div>
          </div>

          {/* Basic Service Display */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  {service.description}
                </p>

                {/* Technologies */}
                {service.technologies && service.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {service.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Delivery Time */}
                {service.deliveryTime && (
                  <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                    <Clock className="w-5 h-5" />
                    <span>{service.deliveryTime}</span>
                  </div>
                )}
              </motion.div>

              {/* Service Features/Content would go here */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  {lang === 'ar' ? 'تفاصيل الخدمة' : 'Service Details'}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 text-center mb-8 leading-relaxed">
                  {lang === 'ar' 
                    ? 'تواصل معنا للحصول على تفاصيل أكثر حول هذه الخدمة والبدء في مشروعك.'
                    : 'Contact us to get more details about this service and start your project.'
                  }
                </p>

                <div className="text-center">
                  <Button
                    size="lg"
                    onClick={() => setLocation(`/contact?service=${service.id}`)}
                    className="mr-4"
                  >
                    {lang === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setLocation('/services')}
                  >
                    {lang === 'ar' ? 'تصفح خدمات أخرى' : 'Browse Other Services'}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Mobile App Development Service Page
  return (
    <>
      <SEOHead
        title={t('mobileAppPage.hero.title', 'تطوير تطبيقات الهواتف الذكية') + ' - ' + t('nav.services', 'خدماتنا') + ' | Genius Software Core'}
        description={t('mobileAppPage.hero.desc', 'نطور تطبيقات احترافية وسريعة الاستجابة لأنظمة iOS و Android بأحدث التقنيات والمعايير العالمية مع واجهات مستخدم حديثة وتجربة استخدام مميزة')}
        keywords="تطوير تطبيقات، أندرويد، iOS، تطبيقات جوال، React Native، Flutter"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-white via-brand-sky-light/20 to-brand-sky-base/10" dir={dir}>
        
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/services')}
              className="text-gray-600 hover:text-gray-900"
              data-testid="button-back-services"
            >
              <ArrowLeft className={cn("w-4 h-4 mr-2", dir === 'rtl' && "rotate-180 mr-0 ml-2")} />
              {t('mobileAppPage.sections.backToServices', 'العودة للخدمات')}
            </Button>
          </motion.div>
        </div>

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-gray-100/50 bg-[size:32px_32px] opacity-30" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Content */}
              <motion.div
                className="text-center md:text-right space-y-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <motion.div
                    className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Smartphone className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="w-24 h-1 bg-gradient-to-r from-primary to-brand-sky-base rounded-full" />
                </div>

                <div className="space-y-4">
                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {t('mobileAppPage.hero.title', 'تطوير تطبيقات الهواتف الذكية')}
                  </motion.h1>

                  <motion.p
                    className="text-xl text-gray-600 leading-relaxed max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {t('mobileAppPage.hero.desc', 'نطور تطبيقات احترافية وسريعة الاستجابة لأنظمة iOS و Android بأحدث التقنيات والمعايير العالمية مع واجهات مستخدم حديثة وتجربة استخدام مميزة')}
                  </motion.p>

                  {/* Tech Badges */}
                  <motion.div
                    className="flex flex-wrap gap-3 justify-center md:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Badge variant="secondary" className="px-4 py-2 bg-blue-100 text-blue-800 border-blue-200">
                      React Native
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 bg-green-100 text-green-800 border-green-200">
                      Flutter
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 bg-orange-100 text-orange-800 border-orange-200">
                      Swift
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 bg-purple-100 text-purple-800 border-purple-200">
                      Kotlin
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 bg-red-100 text-red-800 border-red-200">
                      Firebase
                    </Badge>
                  </motion.div>

                  {/* Delivery Time */}
                  <motion.div
                    className="flex items-center gap-3 justify-center md:justify-start text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{t('mobileAppPage.hero.deliveryTimeLabel', '4-8 أسابيع')}</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Visual Element */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="relative w-full h-96 bg-gradient-to-br from-primary/20 to-brand-sky-base/30 rounded-3xl flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Smartphone className="w-32 h-32 text-primary" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Category Filter Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('mobileAppPage.sections.chooseAppType', 'اختر نوع التطبيق الذي تريده')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('mobileAppPage.sections.chooseAppDesc', 'نصمم تطبيقات متخصصة لكافة المجالات من التجارة الإلكترونية إلى الصحة والتعليم والترفيه')}
              </p>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category.key}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-all duration-300",
                    selectedCategory === category.key
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  )}
                  onClick={() => setSelectedCategory(category.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`filter-${category.key}`}
                >
                  {category.label}
                </motion.button>
              ))}
            </motion.div>

            {/* App Cards Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {filteredCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full group hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary/30 hover:bg-gradient-to-br hover:from-white hover:to-primary/5">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <motion.div
                            className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Smartphone className="w-6 h-6 text-primary" />
                          </motion.div>
                          {card.tag && (
                            <Badge 
                              variant={card.tag === 'Enterprise' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {card.tag}
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                          {card.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {card.shortDesc}
                        </p>
                        
                        <ul className="space-y-1 mb-4">
                          {card.keyFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                            onClick={() => handleViewDetails(card)}
                            data-testid={`button-details-${card.id}`}
                            aria-label={`عرض تفاصيل ${card.title}`}
                          >
                            <Info className="w-4 h-4 mr-1" />
                            {t('mobileAppPage.sections.viewDetailsButton', 'عرض التفاصيل')}
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                            onClick={() => setLocation('/contact?service=mobile-apps')}
                            data-testid={`button-discuss-${card.id}`}
                          >
                            {t('mobileAppPage.sections.discussAppButton', 'ناقش التطبيق')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Custom App CTA */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('mobileAppPage.sections.customAppTitle', 'لديك فكرة تطبيق مختلفة؟')}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t('mobileAppPage.sections.customAppDesc', 'لا تتردد في التواصل معنا لمناقشة فكرتك الفريدة. نحن متخصصون في تحويل الأفكار الإبداعية إلى تطبيقات ناجحة')}
                </p>
                <Button 
                  size="lg"
                  onClick={() => setLocation('/contact?service=mobile-apps')}
                  data-testid="button-discuss-custom-idea"
                >
                  {t('mobileAppPage.sections.customAppButton', 'ناقش فكرتك معنا')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('mobileAppPage.whatYouGet.title')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-brand-sky-base rounded-full mx-auto" />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[  
                { title: t('mobileAppPage.whatYouGet.points.0.title'), desc: t('mobileAppPage.whatYouGet.points.0.desc') },
                { title: t('mobileAppPage.whatYouGet.points.1.title'), desc: t('mobileAppPage.whatYouGet.points.1.desc') },
                { title: t('mobileAppPage.whatYouGet.points.2.title'), desc: t('mobileAppPage.whatYouGet.points.2.desc') },
                { title: t('mobileAppPage.whatYouGet.points.3.title'), desc: t('mobileAppPage.whatYouGet.points.3.desc') }
              ].map((point, index) => {
                const icons = [Shield, Clock, BarChart3, GraduationCap];
                const IconComponent = icons[index];
                return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary/30 hover:bg-gradient-to-br hover:from-white hover:to-primary/5">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="w-12 h-12 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <IconComponent className="w-6 h-6 text-primary" />
                      </motion.div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {point.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm group-hover:text-gray-900 transition-colors duration-300">
                        {point.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="py-20 bg-gradient-to-br from-brand-sky-light/20 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('mobileAppPage.howWeWork.title')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-brand-sky-base rounded-full mx-auto" />
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {[
                { number: t('mobileAppPage.howWeWork.steps.0.number'), title: t('mobileAppPage.howWeWork.steps.0.title'), desc: t('mobileAppPage.howWeWork.steps.0.desc') },
                { number: t('mobileAppPage.howWeWork.steps.1.number'), title: t('mobileAppPage.howWeWork.steps.1.title'), desc: t('mobileAppPage.howWeWork.steps.1.desc') },
                { number: t('mobileAppPage.howWeWork.steps.2.number'), title: t('mobileAppPage.howWeWork.steps.2.title'), desc: t('mobileAppPage.howWeWork.steps.2.desc') },
                { number: t('mobileAppPage.howWeWork.steps.3.number'), title: t('mobileAppPage.howWeWork.steps.3.title'), desc: t('mobileAppPage.howWeWork.steps.3.desc') }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline connector */}
                  {index < 3 && (
                    <div className="absolute right-6 top-16 w-0.5 h-16 bg-gradient-to-b from-primary to-brand-sky-base" />
                  )}
                  
                  <Card className="mb-8 group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-br from-primary to-brand-sky-base rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300"
                          whileHover={{ rotate: 5 }}
                        >
                          {step.number}
                        </motion.div>
                        <div className="flex-1 pt-2">
                          <h3 className="font-bold text-xl text-gray-900 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-gradient-to-br from-primary to-brand-sky-base rounded-3xl p-12 text-center text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t('mobileAppPage.cta.title', 'جاهز لبدء مشروعك؟')}
              </motion.h2>
              
              <motion.p
                className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {t('mobileAppPage.cta.desc', 'تواصل معنا اليوم واحصل على استشارة مجانية لتطوير تطبيقك الذكي')}
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100"
                  onClick={() => setLocation('/contact?service=mobile-apps')}
                  data-testid="button-start-project"
                >
                  {t('mobileAppPage.cta.startButton', 'ابدأ مشروعك الآن')}
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => setLocation('/services')}
                  data-testid="button-browse-services"
                >
                  {t('mobileAppPage.cta.browseButton', 'تصفّح خدمات أخرى')}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* App Details Modal */}
      <AppDetailsModal />
    </>
  );
}