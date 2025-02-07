<script setup lang="ts">
import { LearningType } from '@/types/common';
import { fromScoreToLevel, getLevelName } from '@/utils/common';
import {
    IconCompass,
    IconCrown,
    IconGlobe,
    IconMap,
    IconMapPin,
    IconMapPinStar,
    IconPlanet,
    IconSchool,
    IconSparkles,
    IconUserQuestion,
    IconWorld,
    IconWorldStar
} from '@tabler/icons-vue';
import { computed, onBeforeMount, onUnmounted, ref } from 'vue';

const props = defineProps<{
    score: number;
    learningType?: LearningType;
    selected?: boolean;
    size?: 'sm' | 'md' | 'lg';
}>();

const onSmallScreen = () => window.innerWidth < 640;

onBeforeMount(() => {
    window.addEventListener('resize', () => {
        if (onSmallScreen()) {
            size.value = 'lg';
        } else {
            size.value = props.size ?? 'md';
        }
    });
});

onUnmounted(() => {
    window.removeEventListener('resize', () => {});
});

const size = ref(props.size ?? 'md');

if (onSmallScreen()) {
    size.value = 'lg';
}

const level = computed(() => fromScoreToLevel(props.score));
const text = computed(() => getLevelName(props.score));

const icon = computed(() => {
    const defaultIcon = IconSparkles;

    return (
        {
            [-1]: IconUserQuestion,
            [0]: IconSparkles,
            [1]: IconSchool,
            [2]: IconMapPin,
            [3]: IconMapPinStar,
            [4]: IconMap,
            [5]: IconCompass,
            [6]: IconGlobe,
            [7]: IconWorld,
            [8]: IconWorldStar,
            [9]: IconCrown,
            [10]: IconPlanet
        }[level.value] ?? defaultIcon
    );
});

const color = computed(() => {
    const defaultColor = 'bg-gray-100 text-gray-700';

    return (
        {
            [-1]: 'bg-gray-100 text-gray-700',
            [0]: 'bg-gray-200 text-gray-800',
            [1]: 'bg-gray-300 text-gray-900',
            [2]: 'bg-yellow-100 text-yellow-700',
            [3]: 'bg-yellow-200 text-yellow-800',
            [4]: 'bg-yellow-300 text-yellow-900',
            [5]: 'bg-green-200 text-green-700',
            [6]: 'bg-green-300 text-green-800',
            [7]: 'bg-green-400 text-green-900',
            [8]: 'bg-blue-300 text-blue-800',
            [9]: 'bg-blue-400 text-blue-900',
            [10]: 'bg-gradient text-purple-700'
        }[level.value] ?? defaultColor
    );
});
</script>

<template>
    <div class="flex justify-start items-center select-none">
        <p class="w-28 text-center lg:text-start" v-if="learningType">
            {{ $t(learningType) }}
        </p>
        <span
            class="inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset ring-purple-700/10 whitespace-nowrap"
            :class="[
                color,
                {
                    'sm:shadow-[0_2px_20px_rgba(128,_49,232,_0.8)]': selected
                },
                {
                    'text-sm': size === 'sm',
                    'text-base': size === 'md',
                    'text-xl': size === 'lg'
                }
            ]"
        >
            <component
                :is="icon"
                class="mr-2"
                :class="{
                    'w-4 h-4': size === 'sm',
                    'w-6 h-6': size === 'md',
                    'w-8 h-8': size === 'lg'
                }"
            />
            {{ text }}
        </span>
    </div>
</template>
