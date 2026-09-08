<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="flex min-h-svh items-center justify-center bg-background p-4">
    <Card class="w-full max-w-sm">
      <CardHeader class="text-center">
        <CardTitle class="text-xl">Atlas Adjuster Portal</CardTitle>
        <CardDescription>
          Login placeholder — authentication is not implemented in the MVP.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <Input id="email" type="email" placeholder="adjuster@atlas.co.id" disabled />
        </div>
        <div class="space-y-2">
          <label for="password" class="text-sm font-medium">Password</label>
          <Input id="password" type="password" placeholder="••••••••" disabled />
        </div>
        <Button class="w-full" as-child>
          <RouterLink to="/dashboard">Enter Portal (Mock)</RouterLink>
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
