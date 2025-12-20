<template>
  <div class="flow-container">
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      :node-types="nodeTypes"
      :default-viewport="{ x: 0, y: 0, zoom: 1 }"
      :min-zoom="0.2"
      :max-zoom="4"
      :snap-to-grid="true"
      :snap-grid="[15, 15]"
      fit-view-on-init
      class="h-full w-full"
      @connect="onConnect"
      @edge-click="onEdgeClick"
    >
      <Background :pattern-color="patternColor" :gap="20" />
      <MiniMap
        position="bottom-right"
        pannable
        zoomable
        :node-color="minimapNodeColor"
        :mask-color="minimapMaskColor"
        class="!m-3"
      />
      <Controls position="bottom-left" class="!m-3" />

      <!-- Toolbar Panel -->
      <Panel position="top-left" class="flow-toolbar m-3">
        <div class="flex items-center gap-1">
          <UiButton variant="ghost" size="sm" class="flow-toolbar-btn" @click="addNode('input')">
            <Icon name="lucide:play" class="h-4 w-4 text-green-500" />
          </UiButton>
          <UiButton variant="ghost" size="sm" class="flow-toolbar-btn" @click="addNode('process')">
            <Icon name="lucide:cpu" class="h-4 w-4 text-blue-500" />
          </UiButton>
          <UiButton variant="ghost" size="sm" class="flow-toolbar-btn" @click="addNode('decision')">
            <Icon name="lucide:git-branch" class="h-4 w-4 text-amber-500" />
          </UiButton>
          <UiButton variant="ghost" size="sm" class="flow-toolbar-btn" @click="addNode('output')">
            <Icon name="lucide:flag" class="h-4 w-4 text-purple-500" />
          </UiButton>
          <UiButton variant="ghost" size="sm" class="flow-toolbar-btn" @click="addNode('card')">
            <Icon name="lucide:layout" class="h-4 w-4 text-primary" />
          </UiButton>
          <div class="bg-border mx-1 h-6 w-px" />
          <UiButton variant="ghost" size="sm" class="flow-toolbar-btn" @click="fitView">
            <Icon name="lucide:maximize" class="h-4 w-4" />
          </UiButton>
          <UiButton variant="ghost" size="sm" class="flow-toolbar-btn" @click="resetFlow">
            <Icon name="lucide:refresh-cw" class="h-4 w-4" />
          </UiButton>
        </div>
      </Panel>

      <!-- Stats Panel -->
      <Panel position="top-right" class="flow-stats m-3">
        <div class="flex items-center gap-3 text-xs">
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:square" class="text-muted-foreground h-3.5 w-3.5" />
            <span class="text-muted-foreground">{{ nodes.length }}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:git-commit-horizontal" class="text-muted-foreground h-3.5 w-3.5" />
            <span class="text-muted-foreground">{{ edges.length }}</span>
          </div>
        </div>
      </Panel>

      <!-- Custom edge labels -->
      <template #edge-label="{ edge }">
        <div v-if="edge.label" class="bg-background rounded border px-2 py-1 text-xs shadow-sm">
          {{ edge.label }}
        </div>
      </template>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
  import { VueFlow, useVueFlow, Panel } from '@vue-flow/core'
  import { Background } from '@vue-flow/background'
  import { Controls } from '@vue-flow/controls'
  import { MiniMap } from '@vue-flow/minimap'
  import '@vue-flow/core/dist/style.css'
  import '@vue-flow/core/dist/theme-default.css'
  import '@vue-flow/controls/dist/style.css'
  import '@vue-flow/minimap/dist/style.css'

  import type { Node, Edge, Connection } from '@vue-flow/core'

  // Custom node components
  import FlowCustomInputNode from '~/components/Flow/CustomInputNode.vue'
  import FlowCustomOutputNode from '~/components/Flow/CustomOutputNode.vue'
  import FlowCustomProcessNode from '~/components/Flow/CustomProcessNode.vue'
  import FlowCustomDecisionNode from '~/components/Flow/CustomDecisionNode.vue'
  import FlowCustomCardNode from '~/components/Flow/CustomCardNode.vue'

  // Node types mapping
  const nodeTypes = {
    customInput: FlowCustomInputNode,
    customOutput: FlowCustomOutputNode,
    customProcess: FlowCustomProcessNode,
    customDecision: FlowCustomDecisionNode,
    customCard: FlowCustomCardNode,
  }

  // Theme-aware colors
  const colorMode = useColorMode()

  const patternColor = computed(() => {
    return colorMode.value === 'dark' ? 'hsl(var(--muted-foreground) / 0.15)' : 'hsl(var(--muted-foreground) / 0.2)'
  })

  const minimapMaskColor = computed(() => {
    return colorMode.value === 'dark' ? 'hsl(var(--background) / 0.85)' : 'hsl(var(--background) / 0.9)'
  })

  // Minimap node color function
  function minimapNodeColor(node: Node): string {
    const colors: Record<string, string> = {
      customInput: '#22c55e',
      customOutput: '#a855f7',
      customProcess: '#3b82f6',
      customDecision: '#f59e0b',
      customCard: 'hsl(var(--primary))',
    }
    return colors[node.type || ''] || 'hsl(var(--muted-foreground))'
  }

  // Initial nodes
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'customInput',
      position: { x: 50, y: 200 },
      data: { label: 'Start' },
    },
    {
      id: '2',
      type: 'customProcess',
      position: { x: 300, y: 100 },
      data: { label: 'Validate Data' },
    },
    {
      id: '3',
      type: 'customDecision',
      position: { x: 550, y: 200 },
      data: { label: 'Is Valid?' },
    },
    {
      id: '4',
      type: 'customProcess',
      position: { x: 850, y: 100 },
      data: { label: 'Process Request' },
    },
    {
      id: '5',
      type: 'customOutput',
      position: { x: 1100, y: 100 },
      data: { label: 'Success' },
    },
    {
      id: '6',
      type: 'customOutput',
      position: { x: 850, y: 350 },
      data: { label: 'Error' },
    },
    {
      id: '7',
      type: 'customCard',
      position: { x: 50, y: 400 },
      data: {
        label: 'API Gateway',
        type: 'Service',
        icon: 'lucide:cloud',
        iconBg: 'bg-blue-500/10',
        status: 'Running',
        description: 'Handles incoming API requests and routes them to appropriate services.',
        metrics: {
          Requests: '12.5k/s',
          Latency: '45ms',
        },
      },
    },
  ]

  // Initial edges
  const initialEdges: Edge[] = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true,
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      animated: true,
    },
    {
      id: 'e3-4',
      source: '3',
      sourceHandle: 'yes',
      target: '4',
      animated: true,
      label: 'Valid',
      style: { stroke: '#22c55e' },
    },
    {
      id: 'e3-6',
      source: '3',
      sourceHandle: 'no',
      target: '6',
      animated: true,
      label: 'Invalid',
      style: { stroke: '#ef4444' },
    },
    {
      id: 'e4-5',
      source: '4',
      target: '5',
      animated: true,
    },
  ]

  const nodes = ref<Node[]>(initialNodes)
  const edges = ref<Edge[]>(initialEdges)

  const { fitView: vueFlowFitView, addNodes, addEdges } = useVueFlow()

  // Node counter for unique IDs
  const nodeId = ref(10)

  // Add new node
  function addNode(type: 'input' | 'process' | 'decision' | 'output' | 'card') {
    const typeMap: Record<string, string> = {
      input: 'customInput',
      process: 'customProcess',
      decision: 'customDecision',
      output: 'customOutput',
      card: 'customCard',
    }

    const labelMap: Record<string, string> = {
      input: 'New Input',
      process: 'New Process',
      decision: 'New Decision',
      output: 'New Output',
      card: 'New Card',
    }

    const newNode: Node = {
      id: `${nodeId.value++}`,
      type: typeMap[type],
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
      },
      data:
        type === 'card'
          ? {
              label: labelMap[type],
              type: 'Service',
              icon: 'lucide:box',
              status: 'Pending',
              description: 'A new card node.',
            }
          : { label: labelMap[type] },
    }

    addNodes([newNode])
  }

  // Handle edge connection
  function onConnect(connection: Connection) {
    addEdges([
      {
        ...connection,
        id: `e${connection.source}-${connection.target}`,
        animated: true,
      },
    ])
  }

  // Handle edge click (delete)
  function onEdgeClick(_: MouseEvent, edge: Edge) {
    edges.value = edges.value.filter((e) => e.id !== edge.id)
  }

  // Fit view
  function fitView() {
    vueFlowFitView({ padding: 0.2 })
  }

  // Reset flow
  function resetFlow() {
    nodes.value = [...initialNodes]
    edges.value = [...initialEdges]
    nextTick(() => {
      fitView()
    })
  }
</script>

<style>
  /* Fill the content area - works with flex parent */
  .flow-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100dvh - 64px); /* Viewport minus header height */
    background-color: hsl(var(--background));
  }

  /* Vue Flow theming */
  .vue-flow__node {
    cursor: grab;
  }

  .vue-flow__node:active {
    cursor: grabbing;
  }

  .vue-flow__handle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid white;
  }

  /* Toolbar styling */
  .flow-toolbar {
    background-color: hsl(var(--card));
    border-radius: 8px;
    border: 1px solid hsl(var(--border));
    padding: 4px;
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 0.1),
      0 1px 2px -1px rgb(0 0 0 / 0.1);
  }

  .flow-toolbar-btn {
    width: 32px;
    height: 32px;
    padding: 0;
  }

  /* Stats panel styling */
  .flow-stats {
    background-color: hsl(var(--card));
    border-radius: 8px;
    border: 1px solid hsl(var(--border));
    padding: 8px 12px;
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 0.1),
      0 1px 2px -1px rgb(0 0 0 / 0.1);
  }

  /* Minimap theming */
  .vue-flow__minimap {
    background-color: hsl(var(--card));
    border-radius: 8px;
    border: 1px solid hsl(var(--border));
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 0.1),
      0 1px 2px -1px rgb(0 0 0 / 0.1);
  }

  .vue-flow__minimap-mask {
    fill: hsl(var(--background) / 0.85);
  }

  /* Controls theming */
  .vue-flow__controls {
    background-color: hsl(var(--card));
    border-radius: 8px;
    border: 1px solid hsl(var(--border));
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 0.1),
      0 1px 2px -1px rgb(0 0 0 / 0.1);
  }

  .vue-flow__controls-button {
    background-color: hsl(var(--card));
    border-bottom: 1px solid hsl(var(--border));
    width: 28px;
    height: 28px;
  }

  .vue-flow__controls-button:first-child {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }

  .vue-flow__controls-button:last-child {
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    border-bottom: none;
  }

  .vue-flow__controls-button:hover {
    background-color: hsl(var(--accent));
  }

  .vue-flow__controls-button svg {
    fill: hsl(var(--foreground));
  }

  /* Edge styling */
  .vue-flow__edge-path {
    stroke: hsl(var(--muted-foreground) / 0.5);
    stroke-width: 2;
  }

  .vue-flow__edge.selected .vue-flow__edge-path,
  .vue-flow__edge:hover .vue-flow__edge-path {
    stroke: hsl(var(--primary));
  }

  /* Background pattern */
  .vue-flow__background pattern circle {
    fill: hsl(var(--muted-foreground) / 0.3);
  }
</style>
