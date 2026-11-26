window.BLOG_DOMAINS = [
  {
    id: "setup-ebpf",
    badge: "01",
    title: "환경 구성 & eBPF 기초",
    desc: "Vagrant + VirtualBox 기반 K8s 1.33 3노드 실습 환경 구축과 iptables 한계, eBPF 커널 Hook 및 Native Routing 트래픽 검증을 다룹니다."
  },
  {
    id: "observability",
    badge: "02",
    title: "트래픽 가시성 (Observability)",
    desc: "Hubble UI/CLI, Prometheus + Grafana 메트릭 수집, Loki + Promtail을 활용한 Flow Log 시각화 구성을 정리합니다."
  },
  {
    id: "pod-networking",
    badge: "03",
    title: "Node & Pod 네트워크 통신",
    desc: "IPAM, Routing & DNS, Native vs VXLAN Overlay 비교, LoadBalancer IPAM과 L2 Announcement 동작을 살펴봅니다."
  },
  {
    id: "bgp-clustermesh",
    badge: "04",
    title: "BGP & Cluster Mesh",
    desc: "FRR 라우터와의 BGP Control Plane 연동(PodCIDR/LB/ClusterIP 광고) 및 다중 클러스터 Cluster Mesh 구성을 다룹니다."
  },
  {
    id: "service-mesh",
    badge: "05",
    title: "Service Mesh & L7 트래픽 제어",
    desc: "사이드카 없는 Cilium Ingress, Gateway API (Terminate/Passthrough/Weight/Header), Envoy 기반 L7 제어를 정리합니다."
  },
  {
    id: "perf-security",
    badge: "06",
    title: "성능 측정 & 보안 (Security)",
    desc: "kube-burner 부하 테스트와 APF/BPF Map 튜닝, CiliumNetworkPolicy, WireGuard, TLS Inspection 및 Tetragon 런타임 보안을 다룹니다."
  }
];

window.BLOG_POSTS = [
  {
    id: "lab-environment-ebpf",
    domainId: "setup-ebpf",
    file: "pages/lab-environment-ebpf.html",
    title: "테스트 환경 구성과 Cilium 개념 정리",
    sourceUrl: "https://dobby-isfree.tistory.com/252",
    keywords: "Vagrant VirtualBox kubeadm init join iptables eBPF tcx XDP Helm cilium_lxc lxc"
  },
  {
    id: "hubble-observability",
    domainId: "observability",
    file: "pages/hubble-observability.html",
    title: "Hubble을 통한 Cilium Traffic 가시성 확보",
    sourceUrl: "https://dobby-isfree.tistory.com/253",
    keywords: "Hubble Relay UI CLI port-forward observe verdict DROPPED L7 envoy flowlog export dynamic"
  },
  {
    id: "prometheus-grafana",
    domainId: "observability",
    file: "pages/prometheus-grafana.html",
    title: "Prometheus/Grafana를 통한 Cilium 가시성 확보",
    sourceUrl: "https://dobby-isfree.tistory.com/254",
    keywords: "Prometheus Grafana 9962 9963 9965 PromQL L7 visibility hubble-redact-http-urlquery"
  },
  {
    id: "hubble-loki-logging",
    domainId: "observability",
    file: "pages/hubble-loki-logging.html",
    title: "Hubble Flow Logs 수집 및 Loki 시각화",
    sourceUrl: "https://dobby-isfree.tistory.com/255",
    keywords: "Loki Promtail loki-stack events.log Grafana Datasource"
  },
  {
    id: "ipam-detail",
    domainId: "pod-networking",
    file: "pages/ipam-detail.html",
    title: "Node & Pod 네트워크 통신 상세 - IPAM",
    sourceUrl: "https://dobby-isfree.tistory.com/256",
    keywords: "IPAM cluster-pool kubernetes PodCIDR"
  },
  {
    id: "routing-dns",
    domainId: "pod-networking",
    file: "pages/routing-dns.html",
    title: "Node & Pod 네트워크 통신 상세 - Routing & DNS",
    sourceUrl: "https://dobby-isfree.tistory.com/257",
    keywords: "Routing DNS CoreDNS kube-dns"
  },
  {
    id: "native-vs-vxlan",
    domainId: "pod-networking",
    file: "pages/native-vs-vxlan.html",
    title: "Node & Pod 네트워크 통신: Native vs VXLAN",
    sourceUrl: "https://dobby-isfree.tistory.com/258",
    keywords: "Native Routing Static Route VXLAN Overlay Tunnel UDP 8472 cilium_vxlan MTU"
  },
  {
    id: "service-external-ip",
    domainId: "pod-networking",
    file: "pages/service-external-ip.html",
    title: "Service External-IP 활용 & L2 Announcement",
    sourceUrl: "https://dobby-isfree.tistory.com/259",
    keywords: "LB-IPAM CiliumLoadBalancerIPPool CiliumL2AnnouncementPolicy Lease ARP MAC"
  },
  {
    id: "bgp-control-plane",
    domainId: "bgp-clustermesh",
    file: "pages/bgp-control-plane.html",
    title: "Cilium Native + BGP Control Plane 활용",
    sourceUrl: "https://dobby-isfree.tistory.com/260",
    keywords: "BGP FRR CiliumBGPClusterConfig CiliumBGPPeerConfig CiliumBGPAdvertisement TrafficPolicy Local"
  },
  {
    id: "cluster-mesh",
    domainId: "bgp-clustermesh",
    file: "pages/cluster-mesh.html",
    title: "Cilium Cluster Mesh 다중 클러스터 연동",
    sourceUrl: "https://dobby-isfree.tistory.com/261",
    keywords: "Cluster Mesh west east kind nonMasqueradeCIDRs clustermesh-apiserver global affinity local"
  },
  {
    id: "service-mesh-ingress",
    domainId: "service-mesh",
    file: "pages/service-mesh-ingress.html",
    title: "Service Mesh Ingress Support",
    sourceUrl: "https://dobby-isfree.tistory.com/262",
    keywords: "Ingress CiliumEnvoy TPROXY reserved:ingress shared dedicated mkcert TLS Termination"
  },
  {
    id: "gateway-api",
    domainId: "service-mesh",
    file: "pages/gateway-api.html",
    title: "Service Mesh Gateway API Support",
    sourceUrl: "https://dobby-isfree.tistory.com/263",
    keywords: "GatewayClass Gateway HTTPRoute TLSRoute Terminate Passthrough Weight RequestHeaderModifier"
  },
  {
    id: "l7-traffic-management",
    domainId: "service-mesh",
    file: "pages/l7-traffic-management.html",
    title: "L7 Aware Traffic Management (Envoy)",
    sourceUrl: "https://dobby-isfree.tistory.com/264",
    keywords: "CiliumEnvoyConfig CiliumClusterwideEnvoyConfig URL Rewrite Circuit Breaking Traffic Shifting"
  },
  {
    id: "performance-benchmark",
    domainId: "perf-security",
    file: "pages/performance-benchmark.html",
    title: "K8s & Cilium 부하 테스트 및 성능 측정",
    sourceUrl: "https://dobby-isfree.tistory.com/265",
    keywords: "kube-burner kube-ops-view Prometheus APF PriorityAndFairness BPF Map conntrack-gc-interval"
  },
  {
    id: "cilium-network-policy",
    domainId: "perf-security",
    file: "pages/cilium-network-policy.html",
    title: "Cilium Security & CiliumNetworkPolicy",
    sourceUrl: "https://dobby-isfree.tistory.com/267",
    keywords: "Identity CiliumEndpoint CiliumNetworkPolicy Label L4 Port Path toFQDNs"
  },
  {
    id: "e2e-security-tetragon",
    domainId: "perf-security",
    file: "pages/e2e-security-tetragon.html",
    title: "End-to-End Security (WireGuard, TLS) & Tetragon",
    sourceUrl: "https://dobby-isfree.tistory.com/268",
    keywords: "Zero Trust WireGuard cilium_wg0 TLS Inspection originatingTLS terminatingTLS Tetragon eBPF"
  }
];
