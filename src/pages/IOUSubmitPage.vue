<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Plus, ReceiptText, Save, Send, Stamp, Trash2, Upload, Car } from "@lucide/vue";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import CurrencyInput from "@/components/iou/CurrencyInput.vue";
import DatePickerField from "@/components/iou/DatePickerField.vue";
import { compareIsoDates } from "@/lib/date";
import { formatCurrencyIdr } from "@/lib/formatters";

/* ------------------------------------------------------------------ */
/*  State                                                              */
/* ------------------------------------------------------------------ */

const caseNo = ref("");
const formDate = ref(""); // ISO YYYY-MM-DD
const name = ref("Budi Santoso");
const insurer = ref("");
const division = ref("");
const typeOfSurvey = ref("");
const location = ref("");
const meetingStart = ref("");
const meetingEnd = ref("");

const airfare = ref<number | null>(null);
const hotel = ref<number | null>(null);
const carRental = ref<number | null>(null);
const boatRental = ref<number | null>(null);
const taxi = ref<number | null>(null);

interface OtherItem {
  id: string;
  description: string;
  amount: number | null;
}

function createItemId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const otherItems = ref<OtherItem[]>([{ id: createItemId(), description: "", amount: null }]);

const submissionDialogOpen = ref(false);

const divisionOptions = ["Marine Cargo", "Property", "Heavy Equipment"] as const;

/* ------------------------------------------------------------------ */
/*  Computed totals                                                    */
/* ------------------------------------------------------------------ */

const totalTransportation = computed(
  () => (carRental.value ?? 0) + (boatRental.value ?? 0) + (taxi.value ?? 0),
);

const othersTotal = computed(() =>
  otherItems.value.reduce((sum, item) => sum + (item.amount ?? 0), 0),
);

const grandTotal = computed(
  () => (airfare.value ?? 0) + (hotel.value ?? 0) + totalTransportation.value + othersTotal.value,
);

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

const requiredFilled = computed(() =>
  Boolean(caseNo.value.trim() && formDate.value && name.value.trim() && division.value),
);

const canSubmit = computed(() => requiredFilled.value);

const meetingRangeError = computed(() => {
  if (
    meetingStart.value &&
    meetingEnd.value &&
    compareIsoDates(meetingEnd.value, meetingStart.value) < 0
  ) {
    return "End date cannot be before start date";
  }
  return "";
});

// Keep the range invariant: if the start moves past the end, clear the end.
watch([meetingStart, meetingEnd], () => {
  if (
    meetingStart.value &&
    meetingEnd.value &&
    compareIsoDates(meetingEnd.value, meetingStart.value) < 0
  ) {
    meetingEnd.value = "";
  }
});

/* ------------------------------------------------------------------ */
/*  Actions                                                            */
/* ------------------------------------------------------------------ */

function addOtherItem() {
  otherItems.value.push({ id: createItemId(), description: "", amount: null });
}

function removeOtherItem(id: string) {
  otherItems.value = otherItems.value.filter((item) => item.id !== id);
}

const formPayload = computed(() => ({
  caseNo: caseNo.value.trim(),
  date: formDate.value,
  name: name.value.trim(),
  insurer: insurer.value.trim(),
  division: division.value,
  typeOfSurvey: typeOfSurvey.value.trim(),
  location: location.value.trim(),
  meetingPeriod: { start: meetingStart.value, end: meetingEnd.value },
  expenses: {
    airfare: airfare.value,
    hotel: hotel.value,
    transportation: {
      carRental: carRental.value,
      boatRental: boatRental.value,
      taxi: taxi.value,
      total: totalTransportation.value,
    },
    others: otherItems.value,
  },
  totals: {
    others: othersTotal.value,
    totalAdvanceRequested: grandTotal.value,
  },
}));

function onSaveDraft() {
  // No backend yet — log the draft state for the future Rails integration.
  console.log("[IOU] save-draft", JSON.parse(JSON.stringify(formPayload.value)));
}

function onSubmit() {
  if (!canSubmit.value) return;
  console.log("[IOU] submit", JSON.parse(JSON.stringify(formPayload.value)));
  submissionDialogOpen.value = true;
}

const approvalRoles: Array<{ title: string; subtitle: string }> = [
  { title: "Adjuster (Submitter)", subtitle: "Budi Santoso · Marine & Energy" },
  { title: "Manager", subtitle: "Pending assignment" },
  { title: "Approved By", subtitle: "Pending approval" },
];
</script>

<template>
  <div class="mx-auto w-full max-w-5xl space-y-5 p-4 sm:p-6 lg:p-8">
    <!-- Header banner -->
    <Card>
      <CardContent class="flex flex-col gap-4 md:flex-row md:items-center">
        <div class="flex min-w-0 items-center gap-3">
          <div class="bg-muted flex size-12 shrink-0 items-center justify-center rounded-lg">
            <img src="/atlas-logo-wide.png" alt="Atlas Adjusting Indonesia" class="h-8 w-auto" />
          </div>
          <div class="min-w-0">
            <p class="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
              Atlas Adjusting Indonesia
            </p>
            <h1 class="text-foreground truncate text-xl font-bold tracking-tight sm:text-2xl">
              Cash Advance Form (IOU)
            </h1>
          </div>
        </div>

        <div class="w-full shrink-0 md:ml-auto md:w-72">
          <Label for="iou-case-no" class="text-foreground">
            Case No
            <span class="text-destructive" aria-hidden="true">*</span>
          </Label>
          <Input
            id="iou-case-no"
            v-model="caseNo"
            placeholder="e.g. 97870.M.11.2025/MC/LA"
            class="mt-1.5"
          />
        </div>
      </CardContent>
    </Card>

    <!-- Section 1: General Information -->
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <DatePickerField v-model="formDate" label="Date" placeholder="Select date" />

          <div>
            <Label for="iou-name" class="text-foreground">
              Name
              <span class="text-destructive" aria-hidden="true">*</span>
            </Label>
            <Input id="iou-name" v-model="name" placeholder="Adjuster name" class="mt-1.5"> </Input>
          </div>

          <div>
            <Label for="iou-insurer" class="text-foreground">Client / Insurer</Label>
            <Input
              id="iou-insurer"
              v-model="insurer"
              placeholder="e.g. PT AVRIST GENERAL INSURANCE"
              class="mt-1.5"
            >
            </Input>
          </div>

          <div>
            <Label for="iou-division" class="text-foreground">
              Division
              <span class="text-destructive" aria-hidden="true">*</span>
            </Label>
            <Select v-model="division">
              <SelectTrigger id="iou-division" class="mt-1.5 w-full">
                <SelectValue placeholder="Select division" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem v-for="option in divisionOptions" :key="option" :value="option">
                  {{ option }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label for="iou-survey-type" class="text-foreground">Type of Survey</Label>
            <Input
              id="iou-survey-type"
              v-model="typeOfSurvey"
              placeholder="Please specify"
              class="mt-1.5"
            >
            </Input>
          </div>

          <div>
            <Label for="iou-location" class="text-foreground">Location</Label>
            <Input
              id="iou-location"
              v-model="location"
              placeholder="Survey location"
              class="mt-1.5"
            >
            </Input>
          </div>

          <div class="md:col-span-2 lg:col-span-3">
            <Label class="text-foreground">Meeting Period</Label>
            <div class="mt-1.5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DatePickerField
                v-model="meetingStart"
                label="Start"
                placeholder="Select start date"
              />
              <DatePickerField
                v-model="meetingEnd"
                label="End"
                :min-date="meetingStart || undefined"
                :error="meetingRangeError || undefined"
                placeholder="Select end date"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Section 2: Planned Expenses -->
    <Card>
      <CardHeader>
        <CardTitle>Planned Expenses</CardTitle>
        <CardDescription>All amounts are in IDR (Rp), integers only.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Label for="iou-airfare" class="text-foreground">Airfare (incl. airport tax)</Label>
            <CurrencyInput id="iou-airfare" v-model="airfare" class="mt-1.5" />
          </div>
          <div>
            <Label for="iou-hotel" class="text-foreground">Hotel</Label>
            <CurrencyInput id="iou-hotel" v-model="hotel" class="mt-1.5" />
          </div>
        </div>

        <!-- Transportation sub-card -->
        <Card size="sm" class="bg-muted/30">
          <CardContent class="space-y-4">
            <div class="flex items-center gap-2">
              <Car class="text-muted-foreground size-4" aria-hidden="true" />
              <h3 class="text-foreground text-sm font-semibold">Transportation</h3>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <Label for="iou-car-rental" class="text-foreground">Car Rental</Label>
                <CurrencyInput id="iou-car-rental" v-model="carRental" class="mt-1.5" />
              </div>
              <div>
                <Label for="iou-boat-rental" class="text-foreground">Boat Rental</Label>
                <CurrencyInput id="iou-boat-rental" v-model="boatRental" class="mt-1.5" />
              </div>
              <div>
                <Label for="iou-taxi" class="text-foreground">Taxi</Label>
                <CurrencyInput id="iou-taxi" v-model="taxi" class="mt-1.5" />
              </div>
            </div>

            <Separator class="bg-border/70" />

            <div class="grid grid-cols-1 items-center gap-2 sm:grid-cols-2">
              <Label for="iou-total-transportation" class="text-foreground">
                Total Transportation
                <span class="text-muted-foreground ml-1 text-xs font-normal"
                  >(auto-calculated)</span
                >
              </Label>
              <CurrencyInput
                id="iou-total-transportation"
                :model-value="totalTransportation"
                readonly
              />
            </div>
          </CardContent>
        </Card>

        <!-- Others sub-card -->
        <Card size="sm" class="bg-muted/30">
          <CardContent class="space-y-3">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <ReceiptText class="text-muted-foreground size-4" aria-hidden="true" />
                <h3 class="text-foreground text-sm font-semibold">Others</h3>
              </div>
              <Button variant="outline" size="sm" type="button" @click="addOtherItem">
                <Plus aria-hidden="true" />
                Add Item
              </Button>
            </div>

            <ul v-if="otherItems.length > 0" class="space-y-2">
              <li
                v-for="(item, index) in otherItems"
                :key="item.id"
                class="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_11rem_auto] sm:items-center"
              >
                <Input
                  v-model="item.description"
                  :placeholder="`Expense description (item ${index + 1})`"
                  class="h-8"
                />
                <CurrencyInput v-model="item.amount" placeholder="Amount" />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  class="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  :aria-label="`Remove item ${index + 1}`"
                  @click="removeOtherItem(item.id)"
                >
                  <Trash2 aria-hidden="true" />
                </Button>
              </li>
            </ul>
            <p v-else class="text-muted-foreground text-xs">No additional expenses added.</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>

    <!-- Section 3: Summary & Financial Totals -->
    <Card>
      <CardHeader>
        <CardTitle>Summary &amp; Financial Totals</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Airfare</span>
            <span class="text-foreground font-medium tabular-nums">
              {{ formatCurrencyIdr(airfare ?? 0) }}
            </span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Hotel</span>
            <span class="text-foreground font-medium tabular-nums">
              {{ formatCurrencyIdr(hotel ?? 0) }}
            </span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Transportation</span>
            <span class="text-foreground font-medium tabular-nums">
              {{ formatCurrencyIdr(totalTransportation) }}
            </span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Other Items</span>
            <span class="text-foreground font-medium tabular-nums">
              {{ formatCurrencyIdr(othersTotal) }}
            </span>
          </div>

          <Separator class="my-3" />

          <div
            class="bg-primary text-primary-foreground flex items-center justify-between gap-4 rounded-lg px-4 py-3.5"
          >
            <span class="text-sm font-medium">Total Advance Requested</span>
            <span class="text-xl font-bold tracking-tight tabular-nums sm:text-2xl">
              {{ formatCurrencyIdr(grandTotal) }}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Section 4: Approval & Workflow placeholders -->
    <Card>
      <CardHeader>
        <div class="flex items-center gap-2">
          <Stamp class="text-muted-foreground size-4" aria-hidden="true" />
          <CardTitle>Approval &amp; Workflow</CardTitle>
        </div>
        <CardDescription>
          Signature upload placeholders — wiring arrives with the backend integration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div v-for="role in approvalRoles" :key="role.title" class="rounded-lg border p-3">
            <p class="text-foreground text-sm font-medium">{{ role.title }}</p>
            <p class="text-muted-foreground mt-0.5 text-xs">{{ role.subtitle }}</p>
            <div
              class="border-input text-muted-foreground mt-3 flex h-28 w-full cursor-not-allowed flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed"
              role="img"
              :aria-label="`${role.title} signature placeholder`"
            >
              <Upload class="size-4" aria-hidden="true" />
              <span class="text-xs font-medium">Click or drop signature</span>
              <span class="text-[0.65rem]">PNG / JPG — placeholder</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Action bar: floating on mobile, inline on desktop -->
    <div class="sticky bottom-16 z-30 md:static md:z-auto">
      <div
        class="bg-background/95 flex flex-col-reverse gap-2 rounded-xl border p-3 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-end md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none"
      >
        <Button variant="outline" type="button" class="w-full sm:w-auto" @click="onSaveDraft">
          <Save aria-hidden="true" />
          Save Draft
        </Button>
        <Button type="button" class="w-full sm:w-auto" :disabled="!canSubmit" @click="onSubmit">
          <Send aria-hidden="true" />
          Submit Application
        </Button>
      </div>
    </div>

    <!-- Submit confirmation placeholder -->
    <AlertDialog v-model:open="submissionDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Application Submitted</AlertDialogTitle>
          <AlertDialogDescription>
            Cash advance request for case
            <span class="text-foreground font-medium">{{ caseNo || "—" }}</span> has been logged
            locally ({{ formatCurrencyIdr(grandTotal) }}). Submission to the backend will be wired
            in a later sprint.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
