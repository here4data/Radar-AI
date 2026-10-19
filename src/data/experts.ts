export interface IndustryExpert {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatarInitials: string;
  badge: string;
  keyTheme: string;
  highlightQuote: string;
  recentInsight: string;
  suggestedPerspective: string;
  portalSource: string;
  profileUrl: string;
}

export const INDUSTRY_EXPERTS: IndustryExpert[] = [
  {
    id: 'expert-andrew-ng',
    name: 'Andrew Ng',
    role: 'Fundador & Director',
    organization: 'DeepLearning.AI / The Batch',
    avatarInitials: 'AN',
    badge: 'Pionero de IA',
    keyTheme: 'Modelos Destilados & Agentes Compuestos',
    highlightQuote: 'En producción, los modelos compactos y destilados de 8B parámetros bien orquestados superan en coste, latencia y control a los LLMs monstruosos de caja negra.',
    recentInsight:
      'Advierte que la obsesión de las empresas con modelos de 70B+ está desangrando presupuestos sin aportar valor incremental. La verdadera ventaja competitiva está en la orquestación multi-agente y la destilación sobre datos propios.',
    suggestedPerspective:
      'Como señala Andrew Ng en The Batch, el verdadero salto empresarial no es tener el modelo más gigante, sino dominar modelos destilados y pipelines de inferencia predecibles.',
    portalSource: 'The Batch (deeplearning.ai/the-batch)',
    profileUrl: 'https://deeplearning.ai/the-batch',
  },
  {
    id: 'expert-andrej-karpathy',
    name: 'Andrej Karpathy',
    role: 'Fundador Eureka Labs / Ex-OpenAI',
    organization: 'Eureka Labs',
    avatarInitials: 'AK',
    badge: 'Arquitectura & Agentes',
    keyTheme: 'Programación con Agentes & Deconstrucción',
    highlightQuote: 'La programación asistida por IA ya no es un autocompletado avanzado; estamos pasando a delegar deconstrucción de software y arquitectura a agentes autónomos.',
    recentInsight:
      'Comenta la evolución de herramientas como Claude Code, Cursor y REA: los desarrolladores ahora operan como arquitectos y directores de orquesta que desmantelan y reconstruyen sistemas en minutos.',
    suggestedPerspective:
      'Siguiendo la visión de Karpathy, el desarrollo de software cambió de escribir sintaxis a orquestar agentes que inspeccionan, auditan e integran componentes a alta velocidad.',
    portalSource: 'TLDR AI / GitHub',
    profileUrl: 'https://tldr.tech/ai',
  },
  {
    id: 'expert-cassie-kozyrkov',
    name: 'Cassie Kozyrkov',
    role: 'CEO Data Scientific / Ex-Chief Decision Scientist',
    organization: 'Google',
    avatarInitials: 'CK',
    badge: 'Decision Intelligence',
    keyTheme: 'Métricas de Vanidad vs ROI Real',
    highlightQuote: 'Un dashboard que muestra métricas impresionantes pero no explica la procedencia de cada número ni influye en decisiones es simplemente un adorno corporativo caro.',
    recentInsight:
      'Insiste en que la llegada de trazabilidad matemática en LLMs y dashboards auditables (como en Claude Dashboards) es el único camino para que los comités de dirección confíen en la analítica de IA.',
    suggestedPerspective:
      'Como enfatiza Cassie Kozyrkov, los datos que no muestran su linaje y cálculo exacto no merecen sentarse en la mesa de decisiones ejecutivas.',
    portalSource: 'Conceptos Claros / Towards Data Science',
    profileUrl: 'https://conceptosclaros.com',
  },
  {
    id: 'expert-simon-willison',
    name: 'Simon Willison',
    role: 'Co-creador de Django & Datasette',
    organization: 'Datasette / Simon Willison Blog',
    avatarInitials: 'SW',
    badge: 'Ecosistema Abierto',
    keyTheme: 'Model Context Protocol (MCP) & SQL Local',
    highlightQuote: 'Model Context Protocol (MCP) es el protocolo que la industria necesitaba desesperadamente: un estándar abierto para conectar agentes con bases de datos y herramientas sin silos.',
    recentInsight:
      'Destaca cómo MCP permite que asistentes conecten con Snowflake, Postgres o DuckDB de manera universal, evitando que cada plataforma cree su propio ecosistema cerrado.',
    suggestedPerspective:
      'Adoptar estándares abiertos como MCP y formatos transparentes es lo que evitará que tu stack quede atrapado en el jardín amurallado de un proveedor.',
    portalSource: 'Towards Data Science / TLDR AI',
    profileUrl: 'https://towardsdatascience.com',
  },
  {
    id: 'expert-chip-huyen',
    name: 'Chip Huyen',
    role: 'Autora de "Designing Machine Learning Systems"',
    organization: 'Claypot AI / Stanford',
    avatarInitials: 'CH',
    badge: 'Sistemas en Producción',
    keyTheme: 'Sistemas de Contexto & Memoria de Agentes',
    highlightQuote: 'El éxito de una aplicación de IA en producción se decide un 10% en el prompt, un 20% en el modelo y un 70% en la infraestructura de datos que alimenta el contexto.',
    recentInsight:
      'Enfatiza la gobernanza de datos y la sincronización continua entre lagos de datos y sistemas de recuperación para evitar que los agentes operen con datos obsoletos o alucinen cifras.',
    suggestedPerspective:
      'No le eches la culpa al modelo si la alucinación viene de un pipeline de datos desincronizado. La clave del éxito está en la base de datos.',
    portalSource: 'Data Engineering Weekly',
    profileUrl: 'https://dataengineeringweekly.com',
  },
  {
    id: 'expert-zach-wilson',
    name: 'Zach Wilson',
    role: 'Lead Data Engineer & Educador',
    organization: 'DataExpert.io / Ex-Netflix & Airbnb',
    avatarInitials: 'ZW',
    badge: 'Data Engineering',
    keyTheme: 'Apache Iceberg & Lakehouses Abiertos',
    highlightQuote: 'La batalla de los formatos de tabla terminó: Apache Iceberg ganó. Quien siga con formatos propietarios en Parquet se arrepentirá en su próxima factura cloud.',
    recentInsight:
      'Analiza cómo la unificación de catálogos y formatos de tabla abiertos permite desacoplar totalmente el almacenamiento del cómputo, forzando a los gigantes cloud a bajar precios.',
    suggestedPerspective:
      'Apostar por Iceberg y catálogos abiertos no es una moda técnica; es la mejor estrategia de negociación contra el bloqueo de proveedores cloud.',
    portalSource: 'Aprender Big Data / Data Engineering Weekly',
    profileUrl: 'https://aprenderbigdata.com',
  },
  {
    id: 'expert-allie-miller',
    name: 'Allie K. Miller',
    role: 'Top Voice LinkedIn IA / Inversora',
    organization: 'OpenMachine / Ex-AWS',
    avatarInitials: 'AM',
    badge: 'Estrategia LinkedIn',
    keyTheme: 'Productividad Práctica & Adopción en Negocio',
    highlightQuote: 'La mejor IA no es la que promete revolucionar la empresa en 2030, sino la barra lateral integrada que hoy le ahorra 4 horas a tu equipo en hojas de cálculo y reportes.',
    recentInsight:
      'Resalta la llegada de copilotos integrados en Workspace y Docs: cuando la tecnología vive dentro de la herramienta cotidiana de trabajo, la adopción pasa del 5% al 80% sin capacitación forzada.',
    suggestedPerspective:
      'Menos pilotos teóricos y más integración invisible en las herramientas que el equipo ya utiliza todos los días.',
    portalSource: 'MIT Technology Review / Ben\'s Bites',
    profileUrl: 'https://technologyreview.com',
  },
  {
    id: 'expert-jordan-tigani',
    name: 'Jordan Tigani',
    role: 'CEO MotherDuck / Co-creador BigQuery',
    organization: 'MotherDuck',
    avatarInitials: 'JT',
    badge: 'Analytics & SQL',
    keyTheme: 'DuckDB & El Fin del Big Data Innecesario',
    highlightQuote: 'El 90% de los análisis no son Big Data. Ejecutar DuckDB en WebAssembly o en la máquina local del analista es infinitamente más rápido y barato que encender un cluster de Spark.',
    recentInsight:
      'Celebra la explosión del cómputo en el cliente: analítica interactiva sobre millones de filas directamente en el navegador sin enviar datos a servidores externos.',
    suggestedPerspective:
      'No mates moscas a cañonazos: antes de contratar clusters distribuidos, prueba la velocidad de motores analíticos modernos en memoria local.',
    portalSource: 'KDnuggets / Towards Data Science',
    profileUrl: 'https://kdnuggets.com',
  },
];
